CREATE TABLE `products` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`price` double NOT NULL,
	`image_url` varchar(255),
	`category` varchar(255) NOT NULL,
	`stock` int NOT NULL DEFAULT 0,
	`status` varchar(255) NOT NULL DEFAULT 'available',
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `products_id` PRIMARY KEY(`id`)
);
