import dotenv from 'dotenv'

const envFound = dotenv.config();

if (envFound.error) {
  throw new Error("Couldn't find .env file");
}

const config = {
  PORT: process.env.PORT,
  BASE_URL: process.env.HOST,
  USERNAME: process.env.KEY,
  PASSWORD: process.env.SECRET,
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
  paths: {
    token: {
      path: '/getToken',
      endpoint: process.env.token
    },
    security_key: {
      path: '/getKeys',
      endpoint: `${process.env.prefix}${process.env.sec_key}`
    },
    account: {
      path: '/apertura',
      account_endpoint : `${process.env.prefix}${process.env.account_opening}`
    }
    // captacion: {
    //   main_path: '/banco-azteca/captacion',
    //   keys: '/seguridad/v1/aplicaciones/llaves',
    //   accounts: '/gestion-cuentas/v1',
    //   account_operations: '/cuentas-operaciones/v1',
    //   investment: '/inversiones-azteca/v1',
    // }
 
  }
}

export default config;
