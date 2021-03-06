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
 * RendererImage item
 * Renders the current application into an image.
 *
 * @author FL (Francois Lionet)
 * @date first pushed on 04/03/2018
 */
Friend = window.Friend || {};
Friend.Tree.RenderItems = Friend.Tree.RenderItems || {};

Friend.Tree.RendererImage = function( tree, name, properties )
{    
    this.nameImage = false;
    this.renderItemName = 'Friend.Tree.RenderItems.RendererImage';
    Friend.Tree.Items.init( this, tree, name, 'Friend.Tree.RendererImage', properties );
    if ( !this.nameImage )
        this.nameImage = name;
    this.registerEvents( 'refresh' );
};
Friend.Tree.RendererImage.messageUp = function( message )
{
    return this.startProcess( message, [ 'x', 'y', 'z', 'rotation' ] );
};
Friend.Tree.RendererImage.messageDown = function( message )
{
    this.doRefresh();
    return this.endProcess( message, [ 'x', 'y', 'z', 'rotation' ] );
};

Friend.Tree.RenderItems.RendererImage_HTML = function( tree, name, properties )
{    
	this.nameImage = false;

    this.rendererName = 'Renderer_HTML';
    this.rendererType = 'Sprite';    
    Friend.Tree.RenderItems.init( this, tree, name, 'Friend.Tree.RenderItems.RendererImage_HTML', properties );
};
Friend.Tree.RenderItems.RendererImage_HTML.render = function( properties )
{
	if ( !this.canvas )
	{
		this.canvas = document.createElement( 'canvas' );
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.resources.addImage( this.item.nameImage, this.canvas, Friend.Tree.HOTSPOT_LEFTTOP );   
		this.renderer.startRenderTo( this.item.nameImage, this.canvas );
	}
    return properties;
};
Friend.Tree.RenderItems.RendererImage_HTML.onDestroy = function()
{
    this.renderer.stopRenderTo( this.item.nameImage );
};

Friend.Tree.RenderItems.RendererImage_Canvas2D = function( tree, name, properties )
{    
	this.nameImage = false;

    this.rendererName = 'Renderer_Canvas2D';
    this.rendererType = 'Sprite'; 
    Friend.Tree.RenderItems.init( this, tree, name, 'Friend.Tree.RenderItems.RendererImage_Canvas2D', properties );
};
Friend.Tree.RenderItems.RendererImage_Canvas2D.render = Friend.Tree.RenderItems.RendererImage_Three2D.render;
Friend.Tree.RenderItems.RendererImage_Canvas2D.onDestroy = Friend.Tree.RenderItems.RendererImage_Three2D.onDestroy;
