/*©mit**************************************************************************
*                                                                              *
* This file is part of FRIEND UNIFYING PLATFORM.                               *
* Copyright 2014-2017 Friend Software Labs AS                                  *
*                                                                              *
* Permission is hereby granted, free of charge, to any person obtaining a copy *
* of this software and associated documentation files (the "Software"), to     *
* deal in the Software without restriction, including without limitation the   *
* rights to use, copy, modify, merge, publish, distribute, sublicense, and/or  *
* sell copies of the Software, and to permit persons to whom the Software is   *
* furnished to do so, subject to the following conditions:                     *
*                                                                              *
* The above copyright notice and this permission notice shall be included in   *
* all copies or substantial portions of the Software.                          *
*                                                                              *
* This program is distributed in the hope that it will be useful,              *
* but WITHOUT ANY WARRANTY; without even the implied warranty of               *
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the                 *
* MIT License for more details.                                                *
*                                                                              *
*****************************************************************************©*/
/** @file
 * 
 * file contain function definitions related to webdavtokenmanager
 *
 *  @author PS (Pawel Stefanski)
 *  @date created 09/10/2017
 */

#ifndef __WEBDAV_WEBDAV_TOKEN_MANAGER_H__
#define __WEBDAV_WEBDAV_TOKEN_MANAGER_H__

#include <core/types.h>
#include <network/locfile.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "webdav_token.h"
#include <system/user/user.h>

//
//
//

typedef struct WebdavTokenManager
{
	WebdavToken		*wtm_Tokens;
	void			*wtm_SB;
	pthread_mutex_t	wtm_Mutex;
}WebdavTokenManager;

//
//
//

WebdavTokenManager *WebdavTokenManagerNew( void *sb );

//
//
//

void WebdavTokenManagerDelete( WebdavTokenManager *km );

//
//
//

WebdavToken *WebdavTokenManagerGenerateToken( WebdavTokenManager *tm );

//
//
//

int WebdavTokenManagerAddToken( WebdavTokenManager *wtm, WebdavToken *tok );

//
//
//

WebdavToken *WebdavTokenManagerGetTokenNonce( WebdavTokenManager *wtm, char *nonce );

//
//
//

void WebdavTokenManagerDeleteOld( WebdavTokenManager *wtm );

#endif //__WEBDAV_WEBDAV_TOKEN_MANAGER_H__

