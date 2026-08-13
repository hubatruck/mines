import { createHashRouter } from 'react-router';

import { generatedRoutes } from './generated-routes';

export const router = createHashRouter(generatedRoutes);
