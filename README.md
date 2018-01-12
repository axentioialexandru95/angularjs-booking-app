# angular

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.16.0.

## Build & development

Run `grunt` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma.


## To-do:

I. Web booking miniapp - AngularJS etapa I:

template: https://247airporttransfer.co.uk/get-price/ - LATER tab

1.Pickup address + dropoff address - Google API
2. Price to be calculated : 1RON / 1km + extracar (depending on the type of the car) + extra 1RON if credit card selected

Notes:

- Passenger number, depending on the way it was selected, car lists will show only the cars that can have that capacity
- There should exist validation for emails and phone numbers
- Car types: salon(extra charge +0 & capacity 4 persons); MPV(extra charge +5 & capacity: 5); 8-seater(extra charge +10 & capacity: 8)
- from booking form ignore *small luggage, large luggage, return)
- etc de considerat optiuni de +VIA, switch pickup & dropoff, clear/delete pickup/dropoff


------------------------------ Array
if tips != 0
vehicle == mpv && 8-Seater
payment == Credit/Debit && Cash && Bank Transfer
tips != 0

finalPrice = vehicle + payment + tips + price
arr[]
vehicle.push

finalPrice = [];
finalPrice.push(vehicle.price);
=>
finalPrice = [5] if MPV
finalPrice = [10] if 8-Seater

finalPrice.push(payment.price);
finalPrice = [5,20]
for(i = 0; i < finalPrice.length; i++){
  finalPrice = i;
}

------------------------------ Object
Tips != 0;
finalPrice = {};
finalPrice


priceCalculator = [{name: cars, value: 10}, {name: payment, price: 10}, {name: tips, price: 10}]
var finalPrice = function(){
  for(var i = 0; i < priceCalculator.length){
     console.dir(priceCalculator[i].value);
     priceCalculator[i]++;
    }
  }
}
finalPrice();


