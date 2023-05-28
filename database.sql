CREATE TABLE IF NOT EXISTS `__EFMigrationsHistory` (
    `MigrationId` varchar(150) CHARACTER SET utf8mb4 NOT NULL,
    `ProductVersion` varchar(32) CHARACTER SET utf8mb4 NOT NULL,
    CONSTRAINT `PK___EFMigrationsHistory` PRIMARY KEY (`MigrationId`)
) CHARACTER SET=utf8mb4;

START TRANSACTION;

ALTER DATABASE CHARACTER SET utf8mb4;

CREATE TABLE `Orders` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `UniqueCode` varchar(255) CHARACTER SET utf8mb4 NULL,
    `CustomerName` longtext CHARACTER SET utf8mb4 NULL,
    `Address` longtext CHARACTER SET utf8mb4 NULL,
    `DistanceInKm` int NOT NULL,
    `OrderMentions` longtext CHARACTER SET utf8mb4 NULL,
    CONSTRAINT `PK_Orders` PRIMARY KEY (`Id`)
) CHARACTER SET=utf8mb4;

CREATE TABLE `Restaurants` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `Name` longtext CHARACTER SET utf8mb4 NULL,
    `Schedule` longtext CHARACTER SET utf8mb4 NULL,
    `MinimumOrder` decimal(65,30) NOT NULL,
    `StandardDeliveryMaxDistance` int NOT NULL,
    `StandardDeliveryPrice` decimal(65,30) NOT NULL,
    `ExtraDeliveryFee` decimal(65,30) NOT NULL,
    CONSTRAINT `PK_Restaurants` PRIMARY KEY (`Id`)
) CHARACTER SET=utf8mb4;

CREATE TABLE `Items` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `Name` longtext CHARACTER SET utf8mb4 NULL,
    `Description` longtext CHARACTER SET utf8mb4 NULL,
    `Price` decimal(65,30) NOT NULL,
    `RestaurantId` int NOT NULL,
    CONSTRAINT `PK_Items` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_Items_Restaurants_RestaurantId` FOREIGN KEY (`RestaurantId`) REFERENCES `Restaurants` (`Id`) ON DELETE CASCADE
) CHARACTER SET=utf8mb4;

CREATE TABLE `OrderItems` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `Quantity` int NOT NULL,
    `Mentions` longtext CHARACTER SET utf8mb4 NULL,
    `MenuItemId` int NOT NULL,
    `OrderId` int NOT NULL,
    CONSTRAINT `PK_OrderItems` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_OrderItems_Items_MenuItemId` FOREIGN KEY (`MenuItemId`) REFERENCES `Items` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_OrderItems_Orders_OrderId` FOREIGN KEY (`OrderId`) REFERENCES `Orders` (`Id`) ON DELETE CASCADE
) CHARACTER SET=utf8mb4;

CREATE INDEX `IX_Items_RestaurantId` ON `Items` (`RestaurantId`);

CREATE INDEX `IX_OrderItems_MenuItemId` ON `OrderItems` (`MenuItemId`);

CREATE INDEX `IX_OrderItems_OrderId` ON `OrderItems` (`OrderId`);

CREATE UNIQUE INDEX `IX_Orders_UniqueCode` ON `Orders` (`UniqueCode`);

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20230527161346_createInitial', '7.0.5');

COMMIT;

