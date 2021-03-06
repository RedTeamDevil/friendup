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

/* 
	The Friend VR API - Rationale
	-----------------------------
	
	Each app can have multiple VR APIs running at the same time. Each API holds
	all of the objects, the logic and subroutines for an entire scene. The
	reason why it's built this way, is to allow simpler code layout for a VR
	applications - allowing it to pause and exchange multiple scenes, or run
	multiple scenes at the same time.
*/

// VR Scope
friend.VR =
{
	events: {},
	objectIds: {},
	objects: {},
	addEventListener( event, callback )
	{
		if( !this.events[ event ] ) this.events[ event ] = [];
		this.events[ event ].push( callback );
		return callback;
	},
	removeEventListener( event, ev )
	{
		var o = [];
		var found = false;
		for( var a in this.events[ event ] ) 
		{
			if( this.events[ event ][ a ] != ev )
			{
				o.push( this.events[ event ][ a ] );
			}
			else found++;
		}
		this.events[ event ] = o;
		return found;
	},
	// Create a VR object
	createObject( type, flags, extra )
	{
		var self = this;
		if( !flags ) flags = {};
	
		function genUniqueId( seed )
		{
			var id;
			if( !seed ) seed = 'object_';
			do
			{
				id = seed + Math.random( 0, 999 ) + Math.random( 0, 999 );
			}
			while( self.objectIds[ id ] );
			return id;
		}
		if( friend.VR[ type ] )
		{
			var id = genUniqueId( type + '_' );
			flags.id = id;
			var o = new friend.VR[ type ]( flags, extra );
			if( o )
			{
				this.objects[ id ] = o;
				return o;
			}
		}
		return false;
	}
};

// All supported VR objects
( function( v )
{
	// Simple quad primitive
	v.quad = function( flags, extra )
	{
		this.flags = flags;
		this.extra = extra;
		this.position = flags.position ? flags.position : { x: 0, y: 0, z: 0 };
		this.rotation = flags.rotation ? flags.rotation : { x: 0, y: 0, z: 0 };
		this.size = flags.size ? flags.size : { width: 1, height: 1 };
		this.color = flags.color ? flags.color : 0x808080ff;
		this.label = flags.label ? flags.label : false;
		this.texture = flags.texture ? flags.texture : false;
		this.clickAction = flags.clickAction ? flags.clickAction : false;

		// Communicate to proxy
		Application.sendMessage( {
			type: 'friendvr',
			object: 'quad',
			objectid: this.flags.id,
			command: 'create',
			position: this.position,
			rotation: this.rotation,
			size: this.size,
			color: this.color,
			texture: this.texture,
			label: this.label,
			clickAction: this.clickAction,
			callback: addCallback( function( data )
			{
				if( flags.callback )
					flags.callback( data );
			} )
		} );
	};
	// Set quad position
	v.quad.prototype.setPosition = function( x, z, y )
	{
		this.position = { x: x, y: y, z: z };
		// Communicate to proxy
		Application.sendMessage( {
			type: 'friendvr',
			object: 'quad',
			objectid: this.flags.id,
			command: 'setPosition',
			rotation: this.position
		} );
	};
	// Get position, from real object with callback
	v.quad.prototype.getPosition = function( callback )
	{
		if( !callback )
		{
			return this.position;
		}
		// Get from proxy
		Application.sendMessage( {
			type: 'friendvr',
			object: 'quad',
			objectid: this.flags.id,
			command: 'getPosition',
			callback: addCallback( function( data )
			{
				console.log( 'This was the result', data );
				callback()
			} )
		} );
	};
	// Set quad rotation
	v.quad.prototype.setRotation = function( x, z, y )
	{
		this.rotation = { x: x, y: y, z: z };
		// Communicate to proxy
		Application.sendMessage( {
			type: 'friendvr',
			object: 'quad',
			objectid: this.flags.id,
			command: 'setRotation',
			rotation: this.rotation
		} );
	};
	// Get rotation, from real object with callback
	v.quad.prototype.getRotation = function( callback )
	{
		if( !callback )
		{
			return this.rotation;
		}
		// Get from proxy
		Application.sendMessage( {
			type: 'friendvr',
			object: 'quad',
			objectid: this.flags.id,
			command: 'getRotation',
			callback: addCallback( function( data )
			{
				console.log( 'This was the result', data );
				callback()
			} )
		} );
	};
	// Set size
	v.quad.prototype.setSize = function( width, height )
	{
		this.size = { width: width, height: height };
		// Communicate to proxy
		Application.sendMessage( {
			type: 'friendvr',
			object: 'quad',
			objectid: this.flags.id,
			command: 'setSize',
			size: this.size
		} );
	};
	// Get size, get it back from real object with callback
	v.quad.prototype.getSize = function( callback )
	{
		if( !callback )
		{
			return this.size;
		}
		// Get from proxy
		Application.sendMessage( {
			type: 'friendvr',
			object: 'quad',
			objectid: this.flags.id,
			command: 'getSize',
			callback: addCallback( function( data )
			{
				console.log( 'This was the result', data );
				callback()
			} )
		} );
	};
	// A simple point light
	v.pointLight = function( flags, extra )
	{
		if( !flags ) return;
		
		this.flags = flags;
		this.extra = extra;
		this.position = flags.position ? flags.position : { x: 0, y: 0, z: 0 };
		this.rotation = flags.rotation ? flags.rotation : { x: 0, y: 0, z: 0 };
		this.size = flags.size ? flags.size : { width: 1, height: 1 };
		this.color = flags.color ? flags.color : 0xffffff;
		this.intensity = flags.intensity || flags.intensity === 0 ? flags.intensity : 1;
		
		// Communicate to proxy
		Application.sendMessage( {
			type: 'friendvr',
			object: 'pointLight',
			objectid: this.flags.id,
			command: 'create',
			path: flags.path,
			position: this.position,
			rotation: this.rotation,
			size: this.size,
			color: this.color,
			intensity: this.intensity,
			callback: addCallback( function( data )
			{
				if( flags.callback )
					flags.callback( data );
			} )	
		} );
	};
	// General objects (import from formats)
	v.model = function( flags, extra )
	{
		if( !flags || !flags.path ) return;
		
		this.flags = flags;
		this.extra = extra;
		this.position = flags.position ? flags.position : { x: 0, y: 0, z: 0 };
		this.rotation = flags.rotation ? flags.rotation : { x: 0, y: 0, z: 0 };
		this.size = flags.size ? flags.size : { width: 1, height: 1 };

		// Communicate to proxy
		Application.sendMessage( {
			type: 'friendvr',
			object: 'model',
			objectid: this.flags.id,
			command: 'create',
			path: flags.path,
			position: this.position,
			rotation: this.rotation,
			size: this.size,
			callback: addCallback( function( data )
			{
				if( flags.callback )
					flags.callback( data );
			} )	
		} );
	};
} )( friend.VR );


