function showName (name: string, ...restNames: string[]) {
    console.log(`name: ${name}, restNames: ${restNames.join(" ")}`);
}

showName("Tom", "Jerry", "Lily", "Lucy");