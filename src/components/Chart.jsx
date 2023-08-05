import React from "react";
import { Line } from "react-chartjs-2";
import {Chart as ChartJs, LinearScale, CategoryScale, PointElement, LineElement, Title, Tooltip, Legend} from "chart.js"
// import { background } from "@chakra-ui/react";

ChartJs.register(LinearScale, CategoryScale, PointElement, LineElement, Title, Tooltip, Legend)

const Chart = ({arr=[], currency, days}) =>{


    const date = []
    const prices = []

    for (let i = 0; i < arr.length; i++) {
        if(days==="24h"){
            date.push(new Date(arr[i][0]).toLocaleTimeString())
        }
       else{
        date.push(new Date(arr[i][0]).toLocaleDateString())
        }
        prices.push(arr[i][1])
        
    }

    console.log(arr)

    const data = {
        labels:date,
        datasets:[{
            label:`Prices in ${currency}`,
            data:prices,
            borderColor:"green",
            backgroundColor:"red"
        }]
    }

return(

    
<Line
    options={{
        resposive:true
    }}
    
    data={data}
/>
)
}

export {Chart}