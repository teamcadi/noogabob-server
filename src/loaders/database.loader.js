import db from "mysql2/promise";
import config from "../configs";
import { logger } from "../utils/logger";

const databaseLoader = async () => {
  const connDB = await db.createConnection(config.db);
  await connDB.execute(`CREATE DATABASE IF NOT EXISTS ${config.dbSchema}`);
  await connDB.end();
  logger.info(`CREATE DATABASE IF NOT EXISTS ...`);

  const connTABLE = await db.createConnection({ ...config.db, database: config.dbSchema });
  const tables = [
    `
      CREATE TABLE IF NOT EXISTS family (
          fId varchar(255) NOT NULL,
          createdAt timestamp NOT NULL DEFAULT current_timestamp(),
          updatedAt timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
          PRIMARY KEY (fId)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8
    `,
    `
      CREATE TABLE IF NOT EXISTS user (
          id int(11) NOT NULL AUTO_INCREMENT,
          fId varchar(255) NOT NULL,
          name varchar(255) NOT NULL,
          member varchar(255) NOT NULL,
          createdAt timestamp NOT NULL DEFAULT current_timestamp(),
          updatedAt timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
          PRIMARY KEY (id),
          CONSTRAINT family_user_fk FOREIGN KEY (fId) REFERENCES family (fId) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8
    `,
    `
    CREATE TABLE IF NOT EXISTS dog (
        id int(11) NOT NULL AUTO_INCREMENT,
        fId varchar(255) NOT NULL,
        name varchar(255) NOT NULL,
        age int(11) NOT NULL,
        kind varchar(255) NOT NULL,
        meal1 timestamp NOT NULL,
        meal2 timestamp NULL,
        meal3 timestamp NULL,
        createdAt timestamp NOT NULL DEFAULT current_timestamp(),
        updatedAt timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
        PRIMARY KEY (id),
        CONSTRAINT family_dog_fk FOREIGN KEY (fId) REFERENCES family (fId) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8
  `,
    `
    CREATE TABLE IF NOT EXISTS album (
        id int(11) NOT NULL AUTO_INCREMENT,
        fId varchar(255) NOT NULL,
        imageName varchar(255) NOT NULL,
        createdAt timestamp NOT NULL DEFAULT current_timestamp(),
        updatedAt timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
        PRIMARY KEY (id),
        CONSTRAINT family_album_fk FOREIGN KEY (fId) REFERENCES family (fId) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8
  `,
    `
    CREATE TABLE IF NOT EXISTS snack (
        id int(11) NOT NULL AUTO_INCREMENT,
        userId int(11) NOT NULL,
        dogId int(11) NOT NULL,
        createdAt timestamp NOT NULL DEFAULT current_timestamp(),
        updatedAt timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
        PRIMARY KEY (id),
        CONSTRAINT user_snack_fk FOREIGN KEY (userId) REFERENCES user (id) ON DELETE CASCADE,
        CONSTRAINT dog_snack_fk FOREIGN KEY (dogId) REFERENCES dog (id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8
  `,
    `
  CREATE TABLE IF NOT EXISTS meal (
      id int(11) NOT NULL AUTO_INCREMENT,
      userId int(11) NOT NULL,
      dogId int(11) NOT NULL,
      createdAt timestamp NOT NULL DEFAULT current_timestamp(),
      updatedAt timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
      PRIMARY KEY (id),
      CONSTRAINT user_meal_fk FOREIGN KEY (userId) REFERENCES user (id) ON DELETE CASCADE,
      CONSTRAINT dog_meal_fk FOREIGN KEY (dogId) REFERENCES dog (id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8
`,
  ];
  await Promise.all(tables.map((e) => connTABLE.execute(e)));
  await connTABLE.end();
  logger.info(`CREATE TABLE IF NOT EXISTS ...`);
  logger.info("Database loaded");
};

export default databaseLoader;
