-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `imageUrl` VARCHAR(255) NULL,
    `description` TEXT NULL,
    `price` INTEGER NOT NULL,
    `stock` INTEGER NOT NULL DEFAULT 0,
    `origin` VARCHAR(50) NOT NULL,
    `weight` VARCHAR(50) NULL,
    `shippingFee` INTEGER NOT NULL DEFAULT 3500,
    `shippingMethod` VARCHAR(50) NOT NULL DEFAULT '택배',
    `minOrderQty` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
