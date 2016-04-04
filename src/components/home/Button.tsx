import * as React from 'react';




interface ButtonProps {
	
	/**
	 * 要在按钮上显示的图标数据
	 */
	icon:string;
	
	/**
	 * 要在按钮上显示的文本
	 */
	label:string;
	
	
}

/**
 * Button 组件是常用的矩形按钮。Button 组件看起来可以按压。默认外观具有一个文本标签和图标显示对象。
 */
export default class Button extends React.Component<any,any>{
	
	constructor(){
		super();
        this.state = {index:0,value:"默认值"};
	}
    
    private onClick(){
        
        
        var img:Element | React.Component<any,any> = this.refs['img'];
        
        alert (img);
        this.setState({index:this.state.index+1});

    }
    
    render(){
       
        var style = require<any>("./button.css");
        if (Math.random() > .5){
             var i = 2;
            
        }
        else {
            var i = 1;
        }
       
        var url = `./${i}.jpg`; 
     
     
     
        
     
       
        var url = "./2.jpg"
        var source:string = require<string>(url)  
        console.log (style)
        return (
            <div className={style.mi} style={{width:1000}}>
            <button>{this.state.index}</button>
            <img ref="img" src={source} 
                 onClick={()=>this.onClick()}>
                 </img>
                 
                 
                 <input value={this.state.value} onChange={(e:any)=> this.setState({value:e.target.value})}/>
            </div>
        )
        
    }
	
	
	
	
	
}