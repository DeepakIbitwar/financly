import React from 'react'
import { Line } from '@ant-design/charts';
import { Pie } from '@ant-design/charts';




function ChartComponant({sortedTransactions}) {
    
       const data =sortedTransactions.map((item)=>{
        return {date: item.date, amount: item.amount};
       })

       const spendingData=sortedTransactions.filter((transaction)=>{if(transaction.type=="expense"){
        return {tag: transaction.tag, amount: transaction.amount}
       }
      });

      let finalSpendings=spendingData.reduce((acc,obj)=>{
        let key=obj.tag;
        if(!acc[key]){
          acc[key]={tag:obj.tag,amount:obj.amount};
        }else{
          acc[key].amount+=obj.amount;
        }
        return acc;
      },{});
      
        const config = {
          data:data,
          width: 500,
          xField: 'date',
          yField: 'amount',
         
        };
        const spendingConfig= {
          data: Object.values(finalSpendings),
          width: 500,
          angleField: "amount",
          colorField: "tag"
         
        };
        let chart;
        let Pie;
  return (
    <div className='charts-wrapper'>
     <div>
        <h2 style={{margineTop: 0}}>Your Analytics</h2>
     <Line 
     style={{width:"50%"}}
     {...config} onReady={(chartInstance) => (chart = chartInstance)} />
     </div>
     <div>
      <h2>Your Project</h2>
      <Pie {...spendingConfig}
      onReady={(chartInstance)=>(chart=chartInstance)}
      
      />
      <h2>Your Spending</h2>
     </div>
    </div>
  )
}

export default ChartComponant
