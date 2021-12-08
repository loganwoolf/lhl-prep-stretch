//document ready event
$(function(){

  function drawBarChart(data, options, element) {

    $defaultHeight = 600;

    // convert data array to objects if not already
    if (typeof data[0] === 'number') {
      $.each(data, function(index, barValue){
        $structData.push({value: barValue});
      });
    } else {
      $structData = data;
    }

    $structuredData = [];
    $chart = $("<div>").addClass('chart');
    $chart.css('display', 'flex');
    $chart.css('align-items', 'flex-end');
    $chart.css('justify-content', 'space-between');
    options.height ? $chart.css('height', options.height + 'px') : $chart.css('height', $defaultHeight);



    $barsDiv = $('<div>').addClass('bars');
    $barsDiv.css('display', 'flex');
    $barsDiv.css('align-items', 'flex-end');
    $barsDiv.css('justify-content', 'space-between');
    options.height ? $barsDiv.css('height', options.height + 'px') : $barsDiv.css('height', $defaultHeight);
    // compute scale for chart by dividing chart height by maximum data value
    $barScale = (options.height || $defaultHeight) / $structuredData.reduce((acc, barObj) => Math.max(acc, barObj.value), 0);
    // create a bar for each element in the array
    $.each($structuredData, function(index, dataObj) {
      // create bar
      $bar = $('<div>')
        .addClass('bar')
        .attr('data-value', dataObj.value)
        .css('height', (dataObj.value * $barScale) + 'px')
        .css('display', 'flex')
        .css('justify-content', 'center')
        ;
      // set bar options (except label position)
      $bar
        .css('background-color', options.barColor)
        .css('min-width', (options.barWidth / $structuredData.length) + '%')
        ;
      //set label container position within bar
      switch(options.labelPosition) {
      case 'top':
        $bar.css('align-items', 'flex-start');
        break;
      case 'center':
        $bar.css('align-items', 'center');
        break;
      case 'bottom':
        $bar.css('align-items', 'flex-end');
        break;
      }
      // create label container in bar
      $barLabelDiv = $('<div>')
        .addClass('bar-label')
        .css('display', 'flex')
        .css('justify-content', 'center')
        // .css('align-items', 'center')
        ;
      // set label container options (position)
      // create label in label container
      $barLabelValue = $('<p>')
        .addClass('bar-label-value')
        .text(dataObj.value)
        .css('margin', '0')
        .css('font-weight', '700')
        .css('user-select', 'none')
        ;
        // pad labels depending on flex-align
      switch(options.labelPosition) {
      case 'top':
        $barLabelValue.css('margin-top', '3px');
        break;
      case 'bottom':
        $barLabelValue.css('margin-bottom', '3px');
        break;
      }

        // idea: make size dependent on digit count

        // set label options
      $barLabelValue
        .css('color', options.labelColor)
        .css('font-size', options.labelSize + 'px')
      ;

      $barLabelDiv.append($barLabelValue);
      $bar.append($barLabelDiv);

      $barsDiv.append($bar);
    });

    // create a name label for each bar on the x-axis
    $xAxisDiv = $('<div>')
      .addClass('x-axis')
      .css('display', 'flex')
      .css('justify-content', 'space-between')
      ;
    $.each($structuredData, function (index, dataObj) {
      $barLabelValue = $('<p>')
      .css('width', (options.barWidth / $structuredData.length) + '%')
      .css('text-align', 'center')
      .css('color', (options.xAxisColor || 'black'))
      .css('font-size', options.xAxisSize + 'px')
      .css('transform', 'rotate(' + options.xAxisRotation + 'deg)')
      // .css('transform-origin', '%')
      .text(dataObj.name);
      $xAxisDiv.append($barLabelValue)
      ;
    });

    // create title for chart
    $titleBlock = $('<div>')
      .addClass('title')
      .css('background-color', options.titleColor[1] || 'hsla(0, 0%, 0%, 0)')
      ;
    $title = $('<h1>')
      .css('color', options.titleColor[0])
      .css('font-size', options.titleSize + 'px')
      .text(options.chartTitle)
      ;


    $titleBlock.append($title);
    // create

    // add items to chartContainer
    $chartContainer = $('<div>').addClass('api-output ' + element);
    $chartContainer.append($titleBlock);
    $chartContainer.append($barsDiv);
    $chartContainer.append($xAxisDiv);

    // options for body element
    $('body')
      .append($chartContainer)
      .css('font-family', 'monospace')
      .css('background-color', 'grey');

  }

  drawBarChart(
    // plain array
    //[7, 18, 3, 12, 19, 24, 7, 45, 7, 8, 16, 7],
    // objects
    [
      {name: 'Jan', value: 7},
      {name: 'Feb', value: 18},
      {name: 'Mar', value: 3},
      {name: 'Apr', value: 12},
      {name: 'May', value: 19},
      {name: 'Jun', value: 24},
      {name: 'Jul', value: 7},
      {name: 'Aug', value: 45},
      {name: 'Sep', value: 7},
      {name: 'Oct', value: 8},
      {name: 'Nov', value: 16},
      {name: 'Dec', value: 7}
    ],
    {
      height: 200,
      barColor: 'darkorange',
      barWidth: 85,
      labelColor: 'white',
      labelSize: 8,
      labelPosition: 'top',
      chartTitle: 'Data from Sources',
      titleSize: 16,
      titleColor: ['darkorange'],
      xAxisColor: 'white',
      xAxisSize: 8,
      xAxisRotation: 315
    },
    'monthly-change');

});


