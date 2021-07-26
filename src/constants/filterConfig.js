export const DROPDOWN = 'DROPDOWN';
export const RANGE = 'RANGE';
export const NO_OF_ROOMS=[
    {label:'1 BHK',value:1},
    {label:'2 BHK',value:2},
    {label:'3 BHK',value:3},
    {label:'4 BHK',value:4},
    {label:'5 BHK',value:5},
    {label:'6 BHK',value:6},
    ];
export const filterConfig = [
    {
        type:DROPDOWN,
        placeHolder:'Search by No of Rooms',
        values:NO_OF_ROOMS,
        dataKey:'numberOfRooms'
    },
    {
        type:RANGE,
        dataKey:'floorAreaSize',
        placeHolder:'Search by Floor Area',
        label:'Floor Area',
        values:'0,10000',
        labelFormatter :function (item)  {
            const [min, max] = item.split(',');
            return <span>Floor Area: {min} Sqft - {max} Sqft</span>
        }
    },
    {
        type:RANGE,
        dataKey:'pricePerMonth',
        placeHolder:'Search by Price',
        label:'Price Range',
        values:'0,10000',
        labelFormatter :function (item)  {
            const [min, max] = item.split(',');
            return  <span>Price Range: &#x20b9;{min}  - &#x20b9;{max} </span>
        }
    },
]
