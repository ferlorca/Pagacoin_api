import { Application } from "express";
import authRoutes  from './auth-routes';
import configRoutes  from './config-routes';
import userRoutes  from './user-routes';

export function routesConfig(app: Application) {
    authRoutes(app);
    configRoutes(app);
    userRoutes(app);
}