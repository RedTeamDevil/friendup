/*©agpl*************************************************************************
*                                                                              *
* This file is part of FRIEND UNIFYING PLATFORM.                               *
*                                                                              *
* This program is free software: you can redistribute it and/or modify         *
* it under the terms of the GNU Affero General Public License as published by  *
* the Free Software Foundation, either version 3 of the License, or            *
* (at your option) any later version.                                          *
*                                                                              *
* This program is distributed in the hope that it will be useful,              *
* but WITHOUT ANY WARRANTY; without even the implied warranty of               *
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the                 *
* GNU Affero General Public License for more details.                          *
*                                                                              *
* You should have received a copy of the GNU Affero General Public License     *
* along with this program.  If not, see <http://www.gnu.org/licenses/>.        *
*                                                                              *
*****************************************************************************©*/
/** @file
 *
 * Tree engine Tree management elements
 *
 * @author FL (Francois Lionet)
 * @date first pushed on 04/03/2018
 */
Friend = window.Friend || {};
Friend.Tree.RenderItems = Friend.Tree.RenderItems || {};

// Fake item
Friend.Tree.Empty = function( tree, name, properties )
{    
    this.imageName = false;
    this.renderItemName = 'Friend.Tree.RenderItems.Empty';
    Friend.Tree.Items.init( this, tree, name, 'Friend.Tree.Empty', properties );
};
Friend.Tree.Empty.messageUp = function( message )
{
    return this.startProcess( message, [ ] );
};
Friend.Tree.Empty.messageDown = function( message )
{
    return this.endProcess( message, [] );
};

// Fake renderitem
Friend.Tree.RenderItems.Empty = function( tree, item, properties )
{
	this.rendererName = '*';	
    Friend.Tree.RenderItems.init( this, tree, item, 'Friend.Tree.RenderItems.Empty', properties );
};
Friend.Tree.RenderItems.Empty.render = function()
{	
};
Friend.Tree.RenderItems.Empty.message = function ( message )
{
	switch ( message.command )
	{
		case 'resize':
			if ( message.width )
			{
				this.width = message.width;
				this.item.width = message.width;
			}
			if ( message.height )
			{
				this.height = message.height;
				this.item.height = message.height;
            }
            this.item.doRefresh();
			break;
		default:
			break;
	}
}

