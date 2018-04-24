// 绘制直角坐标系
function drawXY () {
    context.save()
    // X
    context.beginPath()
    context.moveTo(30, 430)
    context.lineTo(830, 430)

    context.moveTo(820, 425)
    context.lineTo(830, 430)
    context.lineTo(820, 435)

    context.lineWidth = axisLine.width
    context.strokeStyle = axisLine.color
    context.stroke()
    context.closePath()
    
    // Y
    context.beginPath()
    context.moveTo(430, 30)
    context.lineTo(430, 830)

    context.moveTo(425, 40)
    context.lineTo(430, 30)
    context.lineTo(435, 40)

    context.stroke()
    context.restore()
}

// 绘制刻度
function drawTick () {
    // X 轴刻度
    var xWidth = 400
    var xTickSplit = xWidth / axisTick.xData.length
    // 正向
    context.beginPath()
    context.fillStyle = axisTick.color
    for (let i = 1; i < axisTick.xData.length; i++) {
        context.moveTo(430 + (i * xTickSplit), 430)
        context.lineTo(430 + (i * xTickSplit), 430 - axisTick.height)
        if (axisTick.showText) {
            context.fillText(axisTick.xData[i], 425 + (i * xTickSplit), 445)
        }
    }
    context.lineWidth = axisTick.width
    context.strokeStyle = axisTick.color
    context.stroke()
    context.closePath()
    // 反向
    context.beginPath()
    for (let i = 1; i < axisTick.xData.length; i++) {
        context.moveTo(430 - (i * xTickSplit), 430)
        context.lineTo(430 - (i * xTickSplit), 430 - axisTick.height)
        if (axisTick.showText) {
            context.fillText(axisTick.xData[i], 425 - (i * xTickSplit), 445)
        }
    }
    context.stroke()
    context.closePath()

    // Y轴刻度
    var yWidth = 400
    var yTickSplit = xWidth / axisTick.yData.length
    // 正向
    context.beginPath()
    for (let i = 1; i < axisTick.yData.length; i++) {
        context.moveTo(430, 430 - (i * yTickSplit))
        context.lineTo(430 + axisTick.height, 430 - (i * yTickSplit) )
        
        if (axisTick.showText) {
            context.fillText(axisTick.yData[i], 400, 435 - (i * yTickSplit))
        }
    }
    context.stroke()
    context.closePath()
    // 反向
    context.beginPath()
    for (let i = 1; i < axisTick.yData.length; i++) {
        context.moveTo(430, 430 + (i * yTickSplit))
        context.lineTo(430 + axisTick.height, 430 + (i * yTickSplit) )
        
        if (axisTick.showText) {
            context.fillText(axisTick.yData[i], 400, 435 + (i * yTickSplit))
        }
    }
    context.stroke()
    context.closePath()
}

// 绘制网格
function drawGrid () {
    var xWidth = 400
    var xTickSplit = xWidth / axisTick.xData.length

    var yWidth = 400
    var yTickSplit = xWidth / axisTick.yData.length
    // X 轴网格
    // 正向
    context.beginPath()
    for (let i = 1; i < axisTick.xData.length; i++) {
        context.moveTo(430 + (i * xTickSplit), 430 - yWidth)
        context.lineTo(430 + (i * xTickSplit), 430 + yWidth)
    }
    context.lineWidth = axisGrid.width
    context.strokeStyle = axisGrid.color
    context.stroke()
    context.closePath()
    // 反向
    context.beginPath()
    for (let i = 1; i < axisTick.xData.length; i++) {
        context.moveTo(430 - (i * xTickSplit), 430 - yWidth)
        context.lineTo(430 - (i * xTickSplit), 430 + yWidth)
    }
    context.stroke()
    context.closePath()

    // Y 轴网格
    // 正向
    context.beginPath()
    for (let i = 1; i < axisTick.yData.length; i++) {
        context.moveTo(430 - xWidth, 430 - (i * yTickSplit))
        context.lineTo(430 + xWidth, 430 - (i * yTickSplit))
    }
    context.stroke()
    context.closePath()
    // 反向
    context.beginPath()
    for (let i = 1; i < axisTick.yData.length; i++) {
        context.moveTo(430 - xWidth, 430 + (i * yTickSplit))
        context.lineTo(430 + xWidth, 430 + (i * yTickSplit))
    }
    context.stroke()
    context.closePath()
}

// 绘制点
function drawPoints () {
    var xWidth = 400 / axisTick.xData.length * (axisTick.xData.length - 1)
    var yWidth = 400 / axisTick.yData.length * (axisTick.yData.length - 1)
    var xDataMax = Math.max(...axisTick.xData)
    var yDataMax = Math.max(...axisTick.yData)
    
    // 上面的点右边绘制
    const topPointRightPosition = []
    
    context.fillStyle = axisPoint.color
    for (let i = 0; i < topPoints.length; i++) {
        context.beginPath()
        let topPoint  = topPoints[i]
        let topPointX = 430 + topPoint.x / xDataMax * xWidth
        let topPointY = 430 - topPoint.y / yDataMax * yWidth
        context.arc(topPointX, topPointY, axisPoint.width, 0, 360, false)
        context.fill()
        context.closePath()
        topPointRightPosition.push({x: topPointX, y: topPointY})
    }
    
    context.beginPath()
    context.strokeStyle = axisPoint.color
    context.moveTo(topPointRightPosition[0].x, topPointRightPosition[0].y)
    for (let i = 1; i < topPointRightPosition.length; i++) {
        context.lineTo(topPointRightPosition[i].x, topPointRightPosition[i].y)
    }
    context.stroke()
    context.closePath()
    
    // 上面的点左边绘制
    const topPointLeftPosition = []
    
    context.fillStyle = axisPoint.color
    for (let i = 0; i < topPoints.length; i++) {
        context.beginPath()
        let topPoint  = topPoints[i]
        let topPointX = 430 - topPoint.x / xDataMax * xWidth
        let topPointY = 430 - topPoint.y / yDataMax * yWidth
        context.arc(topPointX, topPointY, axisPoint.width, 0, 360, false)
        context.fill()
        context.closePath()
        topPointLeftPosition.push({x: topPointX, y: topPointY})
    }
    
    context.beginPath()
    context.strokeStyle = axisPoint.color
    context.moveTo(topPointLeftPosition[0].x, topPointLeftPosition[0].y)
    for (let i = 1; i < topPointLeftPosition.length; i++) {
        context.lineTo(topPointLeftPosition[i].x, topPointLeftPosition[i].y)
    }
    context.stroke()
    context.closePath()

    // 下面的点右边绘制
    const bottomPointRightPosition = []
    
    context.fillStyle = axisPoint.color
    for (let i = 0; i < bottomPoints.length; i++) {
        context.beginPath()
        let bottomPoint  = bottomPoints[i]
        let bottomPointX = 430 + bottomPoint.x / xDataMax * xWidth
        let bottomPointY = 430 + bottomPoint.y / yDataMax * yWidth
        context.arc(bottomPointX, bottomPointY, axisPoint.width, 0, 360, false)
        context.fill()
        context.closePath()
        bottomPointRightPosition.push({x: bottomPointX, y: bottomPointY})
    }
    
    context.beginPath()
    context.strokeStyle = axisPoint.color
    context.moveTo(bottomPointRightPosition[0].x, bottomPointRightPosition[0].y)
    for (let i = 1; i < bottomPointRightPosition.length; i++) {
        context.lineTo(bottomPointRightPosition[i].x, bottomPointRightPosition[i].y)
    }
    context.stroke()
    context.closePath()
    
    // 下面的点左边绘制
    const bottomPointLeftPosition = []
    
    context.fillStyle = axisPoint.color
    for (let i = 0; i < bottomPoints.length; i++) {
        context.beginPath()
        let bottomPoint  = bottomPoints[i]
        let bottomPointX = 430 - bottomPoint.x / xDataMax * xWidth
        let bottomPointY = 430 + bottomPoint.y / yDataMax * yWidth
        context.arc(bottomPointX, bottomPointY, axisPoint.width, 0, 360, false)
        context.fill()
        context.closePath()
        bottomPointLeftPosition.push({x: bottomPointX, y: bottomPointY})
    }
    
    context.beginPath()
    context.strokeStyle = axisPoint.color
    context.moveTo(bottomPointLeftPosition[0].x, bottomPointLeftPosition[0].y)
    for (let i = 1; i < bottomPointLeftPosition.length; i++) {
        context.lineTo(bottomPointLeftPosition[i].x, bottomPointLeftPosition[i].y)
    }
    context.stroke()
    context.closePath()
   
    
}

// 绘制轴线字体
function drawAxisLineText () {
    if (axisLine.showLineLabel) {
        context.font = 'normal 13px "Microsoft yahei"'
        context.fillStyle = axisLine.color
        context.fillText(axisLine.yText, 410, 15)
        context.fillTextVertical(axisLine.xText, 850, 410)
    }
}
