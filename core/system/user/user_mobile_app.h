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
 *  User Mobile Application
 *
 * file contain definitions related to user mobile application
 *
 *  @author PS (Pawel Stefanski)
 *  @date created 07/09/2018
 */

#ifndef __SYSTEM_USER_USERMOBILEAPP_H__
#define __SYSTEM_USER_USERMOBILEAPP_H__

#include <core/types.h>
#include <core/nodes.h>

#include <db/sql_defs.h>
#include <system/user/user_application.h>
#include <network/websocket_client.h>
#include <system/user/user.h>
#include <websockets/websocket_req_manager.h>
#include <util/friendqueue.h>

typedef struct UserMobileApp
{
	MinNode			node;
	FULONG			uma_ID;
	FULONG			uma_UserID;
	char			*uma_AppToken;
	char			*uma_AppVersion;
	char			*uma_Platform;
	char			*uma_PlatformVersion;
	char			*uma_Core;
	time_t			uma_CreateTS;
	time_t			uma_LastStartTS;
}UserMobileApp;

//
//
//

UserMobileApp *UserMobileAppNew();

//
//
//

void UserMobileAppDelete( UserMobileApp *app );

//
//
//

void UserMobileAppDeleteAll( UserMobileApp *app );

//
//
//

void UserMobileAppInit( UserMobileApp *app );

/*
CREATE TABLE IF NOT EXISTS `FUserMobileApp` (
  `ID` bigint(32) NOT NULL AUTO_INCREMENT,
  `UserID` bigint(32) NOT NULL,
  `AppToken` varchar(255) DEFAULT NULL,
  `AppVersion` varchar(255) DEFAULT NULL,
  `Platform` varchar(255) DEFAULT NULL,
  `PlatformVersion` varchar(255) DEFAULT NULL,
  `Core` varchar(255) DEFAULT NULL,
  `CreateTS` bigint(32) NOT NULL,
  `LastStartTS` bigint(32) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

*/

static FULONG UserMobileAppDesc[] = { 
    SQLT_TABNAME, (FULONG)"FUserMobileApp",       
    SQLT_STRUCTSIZE, sizeof( struct UserMobileApp ), 
	SQLT_IDINT,   (FULONG)"ID",          offsetof( struct UserMobileApp, uma_ID ), 
	SQLT_INT,     (FULONG)"UserID", offsetof( struct UserMobileApp, uma_UserID ),
	SQLT_STR,     (FULONG)"AppToken",       offsetof( struct UserMobileApp, uma_AppToken ),
	SQLT_STR,     (FULONG)"AppVersion",   offsetof( struct UserMobileApp, uma_AppVersion ),
	SQLT_STR,     (FULONG)"Platform",   offsetof( struct UserMobileApp, uma_Platform ),
	SQLT_STR,     (FULONG)"PlatformVersion",   offsetof( struct UserMobileApp, uma_PlatformVersion ),
	SQLT_STR,     (FULONG)"Core",   offsetof( struct UserMobileApp, uma_Core ),
	SQLT_INT,     (FULONG)"CreateTS", offsetof( struct UserMobileApp, uma_CreateTS ),
	SQLT_INT,     (FULONG)"LastStartTS", offsetof( struct UserMobileApp, uma_LastStartTS ),
	SQLT_INIT_FUNCTION, (FULONG)"init", (FULONG)&UserMobileAppInit,
	SQLT_NODE,    (FULONG)"node",        offsetof( struct UserMobileApp, node ),
	SQLT_END 
};

#endif // __SYSTEM_USER_USERMOBILEAPP_H__