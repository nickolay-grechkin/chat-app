import {type Request, type Response} from 'express';
import {ErrorMessage, HttpStatus} from '../../common/enums/enum';
import {whiteRoutes} from '../../services/server/common/constants/white-routes';
import {token as tokenPackage} from '../../services/token/token';
import {type ExtendedRequest} from '../../common/types/extended-request';

// TODO Refactor
const authMiddleware = (req: Request, res: Response, next: any) => {
	const authHeader = req.headers.authorization;
	const isWhiteRoute = whiteRoutes.some(whiteRoute => {
		const isWhiteRoute = whiteRoute.routePath === req.path;
		const isAvailableMethod = whiteRoute.method === req.method.toLowerCase();

		return isWhiteRoute && isAvailableMethod;
	});

	if (isWhiteRoute) {
		next();
		return;
	}

	if (authHeader) {
		const token = authHeader.split(' ')[1];

		const decodedTokenPayload = tokenPackage.decode(token);

		if (decodedTokenPayload?.err) {
			res.status(HttpStatus.FORBIDDEN).send(ErrorMessage.FORBIDDEN);
		}

		(req as ExtendedRequest).userId = decodedTokenPayload.payload.userId;
		next();
	} else {
		res.status(HttpStatus.UNAUTHORIZED).send(ErrorMessage.UNAUTHORIZED);
	}
};

export {authMiddleware};
