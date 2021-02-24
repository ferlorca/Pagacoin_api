import { Application } from "express";
import authRoutes  from './auth-routes';
import configRoutes  from './config-routes';
import userRoutes  from './user-routes';
import walletRoutes  from './wallet-routes';
import transactionRoutes  from './transaction-routes';

export function routesConfig(app: Application) {
    authRoutes(app);
    configRoutes(app);
    userRoutes(app);
    walletRoutes(app);
    transactionRoutes(app);
}