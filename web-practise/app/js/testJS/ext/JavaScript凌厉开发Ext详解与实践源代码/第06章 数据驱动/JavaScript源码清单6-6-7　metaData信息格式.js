{
	'metaData':{
		 totalProperty:’totalCounts’,
         successProperty:’success’,
         root:’results’,
         id:’id’,
         fields:[
           {name: 'id', mapping: '0',type: 'int'}
           {name: 'common', mapping: '3',type: 'string'},
           {name: 'botanical', mapping: '2',type: 'string'},
           {name: 'light', mapping: '1',},
           {name: 'price', type: 'float', defaultValue:’1.0’},                        
		   {name: 'availDate', type: 'date', dateFormat: 'm/d/Y'},
           {name: 'indoor', type: 'bool'}
         ]
      },
      'success':true,
   	  'totalCounts':2,
	  'results' :[
		{id:0,common:'Bloodroot',botanical,'',light:'Shade',price:2.44,av 
ailDate:'03/15/06',indoor:true},	{id:1,common:'Bloodroot',botanical,'',light:'Shade',price:2.44,av
ailDate:'03/15/06',indoor:true}
	  ]
}