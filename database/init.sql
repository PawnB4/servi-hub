CREATE TABLE `users` (
    `user_id` INT NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL,
    `degree` VARCHAR(255),
    `work_experience` VARCHAR(255),
    `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(),
    `user_profile_image` VARCHAR(255),
    PRIMARY KEY (`user_id`),
    UNIQUE KEY `email` (`email`)
);

CREATE TABLE `services` (
    `service_id` INT NOT NULL AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `service_name` VARCHAR(255) NOT NULL,
    `service_category` VARCHAR(255) NOT NULL,
    `service_description` VARCHAR(255) NOT NULL,
    `frequency` VARCHAR(255) NOT NULL,
    `duration_minutes` VARCHAR(255) NOT NULL,
    `cost` VARCHAR(255) NOT NULL,
    `is_active` TINYINT(1) NOT NULL DEFAULT '1',
    `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(),
    `service_image` VARCHAR(255),
    PRIMARY KEY (`service_id`),
    KEY `user_id_idx` (`user_id`)
);

CREATE TABLE `ratings` (
    `rating_id` INT NOT NULL AUTO_INCREMENT,
    `rating` INT NOT NULL,
    `service_id` INT NOT NULL,
    `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(),
    PRIMARY KEY (`rating_id`),
    KEY `service_id_idx` (`service_id`)
);

CREATE TABLE `contracts` (
    `contract_id` INT NOT NULL AUTO_INCREMENT,
    `service_id` INT,
    `contract_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(),
    `contract_status` VARCHAR(128) NOT NULL DEFAULT 'Solicitado',
    `contract_phone` VARCHAR(128) NOT NULL,
    `contract_mail` VARCHAR(128) NOT NULL,
    `contract_message` VARCHAR(128) NOT NULL,
    PRIMARY KEY (`contract_id`),
    KEY `service_id_idx` (`service_id`)
);

CREATE TABLE `comments` (
    `comment_id` INT NOT NULL AUTO_INCREMENT,
    `service_id` INT,
    `comment_text` VARCHAR(255) NOT NULL,
    `comment_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(),
    `comment_enabled` TINYINT(1) DEFAULT '0',
    PRIMARY KEY (`comment_id`),
    KEY `service_id_idx` (`service_id`)
);
