// Importing necessary modules
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from '@nestjs/common';
import {
	InjectRepository
} from '@nestjs/typeorm';
import {
	Repository
} from 'typeorm';
import {
	Image
} from './image.entity';
import {
	UseInterceptors,
	UploadedFile
} from '@nestjs/common';
import {
	FileInterceptor
} from '@nestjs/platform-express';
import {
	diskStorage
} from 'multer';
import {
	extname
} from 'path';
import {
	File
} from 'multer';
import {
	promises as fs
} from 'fs';
import {
	join
} from 'path';

// Creating a controller for the app
@Controller()
export class AppController {
	constructor(
		@InjectRepository(Image) private imagesRepository: Repository < Image > ,
	) {}

	// Endpoint to get all images
	@Get()
	async getImages(): Promise < Image[] > {
		return this.imagesRepository.find();
	}

	// Endpoint to get a specific image by id
	@Get(':id')
	async getImage(@Param('id') id: string): Promise < Image > {
		return this.imagesRepository.findOne({
			where: {
				id: Number(id)
			}
		});
	}

	// Endpoint to create a new image
	@Post()
	async createImage(@Body() image: Image): Promise < void > {
		await this.imagesRepository.save(image);
	}

	// Endpoint to update an existing image by id
	@Patch(':id')
	async updateImage(
		@Param('id') id: string,
		@Body() image: Partial < Image > ,
	): Promise < void > {
		// Logging the update information to the console
		console.log(`Updating image with id: ${id}`);
		console.log(`Update data: ${JSON.stringify(image)}`);

		// Updating the image in the database
		await this.imagesRepository.update(Number(id), image);

		// Logging successful update to the console
		console.log(`Image updated successfully`);
	}

	// Endpoint to delete an existing image by id
	@Delete(':id')
	async deleteImage(@Param('id') id: string): Promise < void > {
		// Finding the image in the database
		const image = await this.imagesRepository.findOne({
			where: {
				id: Number(id)
			},
		});

		// Deleting the image from the database
		await this.imagesRepository.delete(id);

		// Extracting the filename from the image URL
		const filename = image.imageUrl.split('/').pop();

		// Deleting the image file from the server
		const filePath = join(__dirname, '..', 'uploads', filename);
		await fs.unlink(filePath);
	}

	// Endpoint to upload a new image file and save its information in the database
	@Post('upload')
	@UseInterceptors(
		FileInterceptor('file', {
			storage: diskStorage({
				destination: './uploads',
				filename: (req, file, cb) => {
					// Generating a random name for the file
					const randomName = Array(32)
						.fill(null)
						.map(() => Math.round(Math.random() * 16).toString(16))
						.join('');
					cb(null, `${randomName}${extname(file.originalname)}`);
				},
			}),
		}),
	)
	async uploadFile(
		@UploadedFile() file: File,
		@Body('description') description: string,
	): Promise < void > {
		// Generating the URL for the uploaded file and saving it in the database along with its description
		const imageUrl = `http://localhost:3000/${file.filename}`;
		await this.imagesRepository.save({
			imageUrl,
			description
		});

		// Copying the uploaded file to the dist/uploads directory
		const srcPath = join(__dirname, '..', 'uploads', file.filename);
		const destPath = join(__dirname, '..', 'dist', 'uploads', file.filename);
		await fs.copyFile(srcPath, destPath);
	}
}