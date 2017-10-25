function leDecoratorFactory(randomData: string) {
    return (target, propertyKey: string, descriptor: PropertyDescriptor): any => {
        console.log(111111111111)
      var oldValue = descriptor.value;

      descriptor.value = function () {
        console.log(`Calling "${propertyKey}" with`, arguments, target);
        let value = oldValue.apply(null, [arguments[1], arguments[0]]);

        console.log(`Function is executed`);
        return value + "; This is awesome; " + randomData;
      }
      return descriptor;
    }
}

class JSMeetup {
    speaker = "Ruban";

    @leDecoratorFactory("Extra Data")
    welcome(arg1, arg2) {
      console.log(`Arguments Received are ${arg1} ${arg2}`);
      return `${arg1} ${arg2}`;
    }
  }

//   const meetup = new JSMeetup();

//   console.log(meetup.welcome("World", "Hello"));
