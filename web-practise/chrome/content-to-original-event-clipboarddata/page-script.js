function simulateClick(data) {
    console.log('trigger event in page');
    var event = new KeyboardEvent('paste', {
        ctrlKey: true,
        code: 99
    });

    event.clipboardData = {
        items: [{
            type: data
        }]
    };

    var cb = document.getElementById('firePasteEvent');
    document.dispatchEvent(event);
}
