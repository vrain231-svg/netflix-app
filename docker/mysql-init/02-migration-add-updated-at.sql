USE `netflix-mail`;

SET @column_exists := (
	SELECT COUNT(*)
	FROM information_schema.columns
	WHERE table_schema = 'netflix-mail'
		AND table_name = 'emails'
		AND column_name = 'updated_at'
);

SET @sql := IF(
	@column_exists = 0,
	'ALTER TABLE `emails` ADD COLUMN `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
	'SELECT 1'
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
