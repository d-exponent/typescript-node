import 'dotenv/config';


interface ENV {
    PORT: number | undefined
    NODE_ENV: string | undefined;
    DB_PASSWORD: string | undefined;
    DB_USERNAME: string | undefined;
    DB: string | undefined;
    JWT_SECRET: string | undefined;
    JWT_EXPIRES_IN: number | undefined;
}

const getConfig = (): ENV => {
  return {
    NODE_ENV: process.env.NODE_ENV,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_USERNAME: process.env.DB_USERNAME,
    DB: process.env.DB,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: Number(process.env.JWT_EXPIRES_IN),
    PORT: Number(process.env.PORT) ? process.env.PORT : undefined
  };
};


interface Config {
    PORT: number;
    NODE_ENV: string;
    DB_PASSWORD: string;
    DB_USERNAME: string;
    DB: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: number;
}

const getSanitzedConfig = (config: ENV): Config => {

  Object.entries(config).forEach( feild => {
    const [key, value] = feild

    if (key === 'PORT') return

    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
    
  })
 
  return config as Config;
};



export default getSanitzedConfig(getConfig());