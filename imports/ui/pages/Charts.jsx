import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

let DEBUG = true;
let LOG_TAG = "imports/ui/pages/Charts";

export default class Charts extends React.Component {
    constructor(props) {
        super(props);

        console.log(LOG_TAG,"props : ",props)
    }
    render() {
        const {
            labels,
            colors,
            data,
            height
        } = this.props;
        console.log(LOG_TAG,"data",data);
        console.log(LOG_TAG,"this.props",this.props)
        var max = Math.max.apply(null, data);


        return (
            <div className={ 'Charts'}>

                <div
                    className={ 'Charts--serie '}
                    style={{ height: height ? height: 'auto' }}>
                    {
                        data.map(function (item, itemIndex) {
                            //console.log(LOG_TAG,"item",item);
                            //console.log(LOG_TAG,"itemIndex",itemIndex);
                            var color = colors[itemIndex], style,
                                size = max == 0 ? 0 : item / max * 100;

                            //console.log(LOG_TAG,"color",color);
                            //console.log(LOG_TAG,"size",size);


                            style = {
                                backgroundColor: color,
                                height : size + '%'
                            };

                            return (
                                <div
                                    className={ 'Charts--item' }
                                    style={ style }
                                    key={ itemIndex }>
                                    <b style={{ color: color }}>{ item }</b>
                                    <label>{ labels[itemIndex] }</label>
                                 </div>
                            );
                        })
                    }
                </div>

            </div>
        );



    }
}