
function rectangle(xt,yt,widtht,heightt,label,value) {
    this.x = xt;
    this.y = yt;
    this.width = widtht;
    this.height = heightt;
    this.color = 'grey';
	this.dtBox = null;
	this.render = null;
	this.label = label;
	this.value = value;
};

rectangle.prototype.draw = function (context, c) {
	context.beginPath();
	context.rect(this.x, this.y, this.width, this.height);
	context.fillStyle = c;
	context.fill();
};
rectangle.prototype.onClick = function (obj,r) {

};
rectangle.prototype.onHover = function (obj,r) {
	//this.draw(r.g.context,'red');
	this.dtBox.activate();
};
rectangle.prototype.offHover = function (obj,r) {
	//this.draw(r.g.context,this.color);
	this.dtBox.deActivate();
};
rectangle.prototype.isCollision = function (x2, y2, r2) {
	var status = false;
	if ( x2 > (this.x - r2) && y2 > (this.y - r2) && x2 < (this.x + this.width + r2) && y2 < (this.y + this.height + r2)) {
		status = true;
	}
	return status;
};

function circle(x,y,radius,label,value) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = 'grey';
	this.dtBox = null;
	this.render = null;
	this.label = label;
	this.value = value;
};

circle.prototype.draw = function(context, c) {
	context.beginPath();
	context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
	context.fillStyle = c;
	context.fill();
}
circle.prototype.onClick = function (obj, r) {

}
circle.prototype.onHover = function (obj, r) {
	this.dtBox.activate();
}
circle.prototype.offHover = function (obj, r) {
	this.dtBox.deActivate();
}
circle.prototype.isCollision = function( x, y, r) {
	var status = false;
	var distance = Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2));
	if ( distance < r + this.radius ) {
		status = true;
	}
	return status;
}

function piePiece( x, y,startAngle, endAngle, radius, label, percent, color) {
	this.x = x;
	this.y = y;
	this.sAngle = startAngle;
	this.eAngle = endAngle;
	this.radius = radius;
	this.color = color;
	this.dtBox = null;
	this.render = null;
	this.label = label;
	this.value = percent * 100;
	this.isJutted = false;
};

piePiece.prototype.draw = function(context, c) {
	context.beginPath();
	context.moveTo(this.x, this.y);
	
	if (this.isJutted) {
		var tempX = this.x + (this.radius * .1) * Math.cos(((this.eAngle - this.sAngle) / 2 + this.sAngle) * Math.PI);
		var tempY = this.y + (this.radius * .1) * Math.sin(((this.eAngle - this.sAngle) / 2 + this.sAngle) * Math.PI);
		context.moveTo(tempX, tempY);
		this.drawJut(tempX, tempY);
	} else {
		context.arc(this.x, this.y, this.radius, this.sAngle * Math.PI, this.eAngle * Math.PI, false);
		//context.arc(this.x, this.y, this.radius / 2, this.eAngle * Math.PI, this.sAngle * Math.PI, false);
		context.lineTo(this.x, this.y);
		context.fillStyle = getColor(this.color);
		context.fill();
		context.strokeStyle = 'black';
		context.stroke();
	}
};

piePiece.prototype.drawJut = function(x, y) {
	var context = this.render.g.context; // draw mouse over jutting
	var jutR = this.radius * .15;
	var jutOffset = this.radius * 0;
	/*var jutX = this.x + this.radius * Math.cos(this.sAngle);
	var jutY = this.y + this.radius * Math.sin(this.sAngle);
	var jutStartX = this.x + jutR * Math.cos(this.sAngle);
	var jutStartY = this.y + jutR * Math.sin(this.sAngle);
	var jutEndX = this.x + this.radius * Math.cos(this.eAngle);
	var jutEndY = this.y + this.radius * Math.sin(this.eAngle);*/
	
	//context.beginPath();
	//context.moveTo(jutX, jutY);
	//context.lineTo(jutStartX, jutStartY);
	//context.arc(x, y, this.radius + jutR, this.sAngle * Math.PI, this.eAngle * Math.PI, false);
	//context.lineTo(jutEndX, jutEndY);
	context.arc(x, y, this.radius + jutOffset, this.eAngle * Math.PI, this.sAngle * Math.PI, true);
	//context.lineTo(jutX, jutY);
	context.closePath();
	context.fillStyle = getColor(this.color);
	context.fill();
	context.stroke();
};
piePiece.prototype.onClick = function (obj, r) {

};
piePiece.prototype.onHover = function (r) {
	this.isJutted = true;
	this.dtBox.activate();
};
piePiece.prototype.offHover = function (r) {
	this.isJutted = false;
	this.dtBox.deActivate();
};
piePiece.prototype.isCollision = function( x, y, r) {
	var status = false;
	var deltaX = x - this.x;
	var deltaY = y - this.y;
	var origanX = this.render.g.width - this.x;
	var origanY = this.render.g.height / 2 - this.y;
	var distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2))
	var angle = Math.atan2(deltaY, deltaX);
	if (angle < 0) {
		angle += 2 * Math.PI;
	}
	//var a = Math.atan2(origanX, origanY);
	//angle -= a;
	if ( distance - r < this.radius) {
		if ( angle < this.eAngle * Math.PI && angle > this.sAngle * Math.PI) {
			status = true;
		}
	}
	return status;
};

function legendObject(x, y, color, label, value, index) {
    this.width = 0;
    this.height = 12;
    this.index = index;
    this.x = x;
    this.y = y;
    this.label = label;
    this.value = value;
    this.color = color;
};

legendObject.prototype.getWidth = function(context) {
	var colorOffset = 4;
	var colorBoxSide = this.height;
	context.font = this.height.toString() + 'pt sans-serif';
	this.width = context.measureText(this.label).width + colorOffset + colorBoxSide + (3 * colorOffset);
	return this.width;
}
legendObject.prototype.draw = function (context) {
	context.beginPath();
	context.font = this.height.toString() + 'pt sans-serif';
	this.getWidth(context);

	context.rect(this.x, this.y, 15, this.height); // color box on legend
	context.fillStyle = getColor(this.color);
	context.fill();
	//context.strokeStyle = 'black';
	//context.stroke();

	context.fillStyle = 'black'; // legend label text
	context.fillText(this.label, this.x + 4 + 15, this.y + this.height - 2);
}
legendObject.prototype.onHover = function (r) {
	r.objList[this.index].onHover(r);
}
legendObject.prototype.offHover = function (r) {
	r.objList[this.index].offHover(r);
}
legendObject.prototype.isCollision = function (x, y, r) {
	if (x + r > this.x && this.x + this.width > x - r && this.y < y + r && y - r < this.y + this.height) {
		return true;
	}
	return false;
}

function intervalFunction () {
    if (me.render.isMouseOver(globalMouseCoords.x, globalMouseCoords.y, me.render)) {
        me.intervalId = intervalFunction();
        return;
    }
    me.deActivate();
}

// box to follow the mouse onhover
function detailBox(xt, yt, textt, rt) {
    var me = this;
    this.x = xt;
    this.y = yt;
    this.width = 140;
    this.height = 40;
    this.text = textt;
	this.value = 0;
	this.render = rt;
	this.isActive = false;
	this.intervalId = 0;
};

detailBox.prototype.draw = function (context) {
	context.font = 'bold 13pt sans-serif';
	if (context.measureText('Label:' + this.text).width + 10 > this.width) {
		this.width = context.measureText('Label:' + this.text).width + 10;
	} else if (context.measureText('Label:' + this.text).width + 10 < this.width) {
		this.width = 140;
	}

	if (context.measureText('Value:' + this.value.toString()).width + 10 > this.width) {
		this.width = context.measureText('Value:' + this.value).width + 10;
	} else if (context.measureText('Value:' + this.value.toString()).width + 10 < this.width ) {
		this.width = 140;
	}
	context.beginPath();
	context.moveTo(this.x, this.y);
	context.lineTo(this.x + this.width, this.y);
	context.lineTo(this.x + this.width, this.y + this.height);
	context.lineTo(this.x, this.y + this.height);
	context.lineTo(this.x, this.y);
	context.strokeStyle = '#757575';
	context.fillStyle = '#EDEDED';
	//context.fillStyle = 'black';
	context.fill();
	context.stroke();        
	var lMetrics = context.measureText('Label:');
	var vMetrics = context.measureText('Value:');
	context.fillStyle = 'black';
	context.fillText('Label:', this.x + 2, this.y + 16);
	drawText(this.x + lMetrics.width + 5, this.y + 16, this.text, 11, context);
	context.font = 'bold 13pt sans-serif';
	context.fillStyle = 'black';
	context.fillText('Value:', this.x + 2, this.y + 17 + 13);
	drawText(this.x + vMetrics.width + 5, this.y + 17 + 13, this.value, 11, context);
};
detailBox.prototype.update = function (xt, yt, text, value) {
	if(!this.isActive)
		return;
	if (this.intervalId != 0) {
		clearInterval(this.intervalId);
	}
	/*this.intervalId = setInterval(function () {
		if (me.render.isMouseOver(globalMouseCoords.x, globalMouseCoords.y, me.render)) {
			me.intervalId = 0;
			return;
		}
		me.deActivate();
	}, 1000);*/
	this.render.g.context.clearRect(0,0,this.render.g.canvas.width,this.render.g.canvas.height);
	this.render.drawGraph();
	this.x = xt + 15;
	this.y = yt;
	if (this.x + this.width > this.render.g.width) {
		this.x = this.x - this.width - 15;
		this.x = -this.x > 0 ? 0 : this.x;
	}
	this.y = (this.y + this.height) > this.render.g.height ? this.render.g.height - this.height : this.y;
	this.text = text;
	this.value = value;
	this.draw(this.render.g.context);
};
detailBox.prototype.activate = function () {
	this.isActive = true;
};
detailBox.prototype.deActivate = function () {
	this.isActive = false;
	this.render.g.context.clearRect(0,0,this.render.g.canvas.width,this.render.g.canvas.height);
	this.render.drawGraph();
};

function detailListParent(render) {
    var me = this;
    this.x = 0;
    this.y = 0;
    this.render = render;
    this.listOfDetailBoxs = [];
    this.activeIndex = -1;
    this.intervalId = 0;
    this.update = function (xt, yt, text, value) {
        if (this.activeIndex < 0)
            return;
        //if (this.intervalId != 0) {
        clearInterval(this.intervalId);
        //}
        /*this.intervalId = setInterval(function () {
            if (me.render.isMouseOver(globalMouseCoords.x, globalMouseCoords.y, me.render)) {
                //
                //me.intervalId = 0;
                return;
            }
            me.deActivate();
        }, 1000);*/
        this.render.g.context.clearRect(0, 0, this.render.g.canvas.width, this.render.g.canvas.height);
        this.render.drawGraph();
        this.x = xt + 15;
        this.y = yt;
        this.listOfDetailBoxs[this.activeIndex].y = this.y;
        this.listOfDetailBoxs[this.activeIndex].draw(this.render.g.context);
    }
    this.deActivate = function () {
        if (me.activeIndex < 0)
            return;
        me.listOfDetailBoxs[me.activeIndex].offHover(me.render);
    }
}

function detailListBox(xt, yt, index, xLabel, render, listParent) {
    this.x = xt;
    this.xOffset = 0;
    this.y = yt;
    this.yOffset = 0;
    this.width = 140;
    this.height = 40;
    this.collisionWidth = 0;
    this.index = index;
    this.intervalLabel = xLabel;
    this.valueLabelPairs = [];
    this.render = render;
    this.listParent = listParent;
    this.isActive = false;
};

detailListBox.prototype.draw = function (context) {
	var textHeight = 13;
	var font = 'normal ' + textHeight.toString() + 'pt sans-serif';
	context.font = font;

	// get dimensions 
	var maxWidth = 0;
	var tHeight = textHeight + 2;
	for (var i = 0; i < this.valueLabelPairs.length; i++) {
		var tempString = this.valueLabelPairs[i].label + ': ' + this.valueLabelPairs[i].value.toString();
		var metric = context.measureText(tempString);
		if (metric.width + 10 > maxWidth) {
			maxWidth = metric.width;
		}
		tHeight += textHeight + 2;
	}

	// set box dimensions for room to draw text labels
	if (maxWidth + 10 > this.width) {
		this.width = maxWidth + 10;
	} else if (maxWidth + 10 < this.width) {
		this.width = 140;
	}

	if (this.height < tHeight) {
		this.height = tHeight;
	} else if (this.height > tHeight) {
		this.height = 40;
	}
	/*if (context.measureText('Value:' + this.value.toString()).width + 10 > this.width) {
		this.width = context.measureText('Value:' + this.value).width + 10;
	} else if (context.measureText('Value:' + this.value.toString()).width + 10 < this.width) {
		this.width = 140;
	}*/

	this.y = this.y - this.height - textHeight; // set box above mouse

	// collision with height and width of canvas
	if (this.x + this.width > this.render.g.canvas.width) {
		this.xOffset = this.x - ( this.render.g.canvas.width - this.width);
	}
	if (this.y + this.height > this.render.g.canvas.height) {
		this.yOffset = this.y - (this.render.g.canvas.height - this.height);
	} else if (this.y < 0) {
		this.y = 0;
	}

	context.beginPath();
	context.moveTo(this.x, this.render.g.topOffset);
	context.lineTo(this.x, this.render.g.height - this.render.g.labelOffset);
	context.strokeStyle = '#757575';
	context.stroke();

	var tempX = this.x - this.xOffset;
	var tempY = this.y - this.yOffset;

	context.beginPath();
	context.moveTo(tempX, tempY); // draw background box
	context.lineTo(tempX + this.width, tempY);
	context.lineTo(tempX + this.width, tempY + this.height);
	context.lineTo(tempX, tempY + this.height);
	context.lineTo(tempX, tempY);
	context.closePath();
	context.strokeStyle = '#757575';
	context.fillStyle = '#EDEDED';
	context.fill();
	context.stroke();

	context.font = 'normal ' + (textHeight - 3).toString() + 'pt sans-serif';
	context.textAlign = 'center';
	context.fillStyle = 'black';
	context.fillText(this.intervalLabel.toString(), (tempX + (this.width / 2)), tempY + textHeight);

	context.textAlign = 'start';
	for (var i = 0; i < this.valueLabelPairs.length; i++) {
		context.font = 'normal ' + (textHeight - 2).toString() + 'pt sans-serif';
		context.fillStyle = 'black';
		var pair = this.valueLabelPairs[i];
		var labelMetric = context.measureText(pair.label.toString());
		var tY = tempY + 16 + (textHeight - 1) + ((textHeight + 2) * i);
		context.font = font;
		context.fillText(pair.value.toString(), tempX + labelMetric.width + 11, tY);
		context.fillStyle = getColor( this.render.colorList[i]);
		//drawText(tempX + 5, tY, pair.label + ': ', textHeight - 2, context);
		context.font = 'normal ' + (textHeight - 2).toString() + 'pt sans-serif';
		context.fillText(pair.label.toString() + ': ', tempX + 5, tY);
	}
	/*context.fillStyle = 'black';
	context.fillText('Label:', this.x + 2, this.y + 16);
	drawText(this.x + lMetrics.width + 5, this.y + 16, this.text, 11, context);
	context.font = 'bold 13pt sans-serif';
	context.fillStyle = 'black';
	context.fillText('Value:', this.x + 2, this.y + 17 + 13);
	drawText(this.x + vMetrics.width + 5, this.y + 17 + 13, this.value, 11, context);*/

}
detailListBox.prototype.activate = function () {
	this.isActive = true;
};
detailListBox.prototype.deActivate = function () {
	this.isActive = false;
	this.render.g.context.clearRect(0, 0, this.render.g.canvas.width, this.render.g.canvas.height);
	this.render.drawGraph();
};
detailListBox.prototype.onHover = function (r) {
	this.y = r.mouse.coords.y;
	this.draw(r.g.context);
	this.listParent.activeIndex = this.index;
}
detailListBox.prototype.offHover = function (r) {
	this.listParent.activeIndex = -1;
	clearInterval(this.listParent.intervalId);
	r.g.context.clearRect(0, 0, r.g.canvas.width, r.g.canvas.height);
	r.drawGraph();
}
detailListBox.prototype.isCollision = function (x, y, r) {
	if (this.x - this.collisionWidth - r < x && x < this.x + this.collisionWidth + r && y > this.render.g.topOffset && y < this.render.g.canvas.height - this.render.g.labelOffset ) 
		return true;
	return false;
}

function drawLine(x1, y1, x2, y2, width, context) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineWidth = width;
    context.stroke();
}

function drawText(x, y, text, size, context) {
    context.font = 'normal ' + size.toString() + 'pt sans-serif';
	context.fillStyle = 'black'
    context.fillText(text, x, y);
}

function drawVerticalLabel(x, y, text, context) {
    context.translate(x, y);
    context.rotate(-Math.PI / 2);
    context.textAlign = 'center';
    context.font = '20pt sans-serif';
	context.fillStyle = 'black';
    context.fillText(text, 0, 5);
    context.rotate(Math.PI / 2);
    context.translate(-x,-y);
	context.textAlign = 'start';
}

// Graph Object
function graph() {
    this.canvas = null;
    this.context = null;
    this.scale = 1;
    this.labelOffset = 50;
    this.barWidth = 20;
    this.barOffset = 5;
    this.leftOffset = 30;
    this.rightOffset = this.leftOffset;
    this.topOffset = 10;
    this.gridLabelOffset = 15;
    this.width = 400;
    this.height = 300;
    this.gridRange = 100;
    this.gridCount = 10;
    this.verticalLabel = "Work Items";
};

graph.prototype.addVerticalLine = function () {
	drawLine(this.leftOffset, this.height - this.labelOffset, this.leftOffset, this.topOffset, 1, this.context);
};
graph.prototype.addHorizontalLine = function () {
	drawLine(this.leftOffset, this.height - this.labelOffset, this.width - this.rightOffset, this.height - this.labelOffset, 1, this.context);
};
graph.prototype.addGridLines = function () {
	var gridHeights = (this.height - (this.labelOffset + this.topOffset)) / this.gridCount;
	this.context.fillStyle = 'black';
	this.context.strokeStyle = 'grey';
	for (var i = 1; i < this.gridCount + 1; i++) {
		var tempHeight = this.height - this.labelOffset - (gridHeights * i);
		drawLine(this.leftOffset, tempHeight, this.width - this.rightOffset, tempHeight, .2, this.context); // draw gird lines
		//drawText(this.leftOffset + 1, tempHeight + 8, ((this.gridRange / this.gridCount) * i).toString(), 8, this.context); // draw labels
	};
};
graph.prototype.addGridLabels = function () {
	var gridHeights = (this.height - (this.labelOffset + this.topOffset)) / this.gridCount;
	for (var i = 1; i < this.gridCount + 1; i++) {
		var tempHeight = this.height - this.labelOffset - (gridHeights * i);
		drawText(this.leftOffset + 1, tempHeight + 8, (Math.floor(this.gridRange / this.gridCount) * i).toString(), 8, this.context); // draw labels
	}
};
graph.prototype.drawLayout = function () {
	this.addGridLines();
	this.addGridLabels();
	this.addHorizontalLine();
	this.addVerticalLine();
	var x = this.leftOffset / 2;
	var y = ((this.height - this.labelOffset - this.topOffset) / 2) + this.topOffset;
	drawVerticalLabel(x, y, this.verticalLabel, this.context);
};
graph.prototype.setSize = function(height,width,numData) {
	this.canvas.heigth = height;
	this.canvas.width = width;
	this.width = this.canvas.width;
	this.height = this.canvas.height;		
	var diff = (this.width - (this.gridLabelOffset + this.leftOffset + this.rightOffset));
	this.barWidth = (diff / numData) * (5 / 6);
	this.barOffset = this.barWidth * (1 / 5);
};
graph.prototype.init = function (id, numData, gSettings) {
	var elem = document.getElementById(id);
	var c = document.createElement("canvas");
	
	c.height = elem.clientWidth * (3 / 4);
	c.width = elem.clientWidth;
	
	elem.appendChild(c);
	this.canvas = c;
	this.context = c.getContext('2d');
	this.setSize(c.height, c.width, numData);
	this.gridRange = Math.abs(gSettings.rangeStart - gSettings.rangeEnd);
	this.verticalLabel = gSettings.yLabel;
};

function getBarXList (count, graph) {
    var l = new Array(count);
    var startX = graph.leftOffset + graph.gridLabelOffset + 2;
    for (var i = 0; i < l.length; i++) {
        l[i] = startX;
        startX += graph.barWidth + graph.barOffset;
    }
    return l;
};

function getBarYList (data, graph) {
    var l = new Array(data.length);
    for (var i = 0; i < l.length; i++) {
        l[i] = (data[i].value / graph.gridRange) * (graph.height - (graph.labelOffset + graph.topOffset));
    }
    return l;
}

function getBarGraphBars(data, graph) {
    var bars = new Array(data.length);
    var xList = getBarXList(data.length, graph);
    var yList = getBarYList(data,graph);

    for (var i = 0; i < data.length; i++) {
        var y = graph.height - (yList[i] + graph.labelOffset);
        bars[i] = new rectangle(xList[i], y, graph.barWidth, yList[i], data[i].label, data[i].value);
    };
    return bars;
};

function getMultiBarGraphBars(data, graph) {
	var bars = new Array(data.length);
	var xList = getBarXList(data.length, graph);
	for (var i = 0; i < data.length; i++) {
		bars[i] = new Array(data[i].list.length);
		var yList = getBarYList(data[i].list, graph);
		for (var j = 0; j < data[i].list.length; j++) {			
			var y = graph.height - (yList[j] + graph.labelOffset);
			var tempWidth = graph.barWidth / data[i].list.length;
			bars[i][j] = new rectangle(xList[i] + (tempWidth * j), y, tempWidth, yList[j], data[i].list[j].label, data[i].list[j].value);
		}
	}
	return bars;
}

function getLineGraphPoints(data, graph) {
	var points = new Array(data.length);
	for (var i = 0; i < data.length; i++) { // loop through list of point arrays
		var xList = getBarXList(data[i].length, graph);
		var yList = getBarYList(data[i], graph);
		points[i] = new Array(data[i].length, graph);
		for (var j = 0; j < data[i].length; j++) { // loop through array of points
			var y = graph.height - (yList[j] + graph.labelOffset);
			points[i][j] = new circle(xList[j] + (graph.barWidth / 2), y, 5, data[i][j].label, data[i][j].value);
		}
	}
	return points;
}

function getPieGraphPieces(data, graph, render) {
	var cx = graph.width / 2;
	var cy = render.legendList[0].y / 2;
	var tempAngle = 0;
	var total = getTotalValue(data);
    //var r = (graph.canvas.width * 1/2) / 2;
	var r = cy * .8;
	var pieces = new Array(data.length);
	for (var i = 0; i < data.length; i++) {
		var percent = data[i].value / total;
		var angle = 2 * percent;
		pieces[i] = new piePiece(cx, cy, tempAngle, angle + tempAngle, r, data[i].label, percent, 'grey'); // ( x, y,startAngle, endAngle, radius, label, percent, color)
		tempAngle += angle;
	}
	return pieces;
}

// insertion sort
function swapValues(list, fPos, sPos) {
    var temp = list[fPos];
    list[fPos] = list[sPos];
    list[sPos] = temp;
}

function sortList(data, context) {
    var newList = [];
    newList.push(data[0]);
    for (var i = 1; i < data.length; i++) {
        newList.push(data[i]);
        for (var k = i; k > 0 && context.measureText(newList[k].label).width > context.measureText(newList[k - 1].label).width ; k--) {
            swapValues(newList, k - 1, k);
        }
    }
    return newList;
}

function getPieGraphLegend(data, colorList, radius, graph) {
    var listOfLegendObjects = [];
    var totalWidth = 0;
    var findingRowNumber = true;

    var sortedList = sortList(data, graph.context);
    data = sortedList;

    for (var i = 0; i < data.length; i++) {
        listOfLegendObjects.push(new legendObject(0, 0, colorList[i], sortedList[i].label, sortedList[i].value, i));
        totalWidth += listOfLegendObjects[i].getWidth(graph.context);
    }

    resizePieGraphLegendR2(listOfLegendObjects, radius, totalWidth, graph);
    return [listOfLegendObjects, data];
}

function resizePieGraphLegendR2(listOfLegendObjects, radius, totalWidth, graph) {
    //var totalWidth = 0;
    var findingRowNumber = true;
    var numRows = 1;

    while (findingRowNumber) {
        if (totalWidth > graph.canvas.width - 10 * 2 - 4 * (listOfLegendObjects.length / numRows)) {
            numRows += 1;
            totalWidth = 0;
        } else {
            findingRowNumber = false;
            break;
        }
        for (var i = 0; i < listOfLegendObjects.length / numRows; i++) {
            totalWidth += listOfLegendObjects[i * numRows].getWidth(graph.context) + 4;
        }
    }

    var index = 0;
    var heightOffset = 3;
    var x = 10;
    for (var i = 0; i < listOfLegendObjects.length / numRows; i++) {
        for (var j = 0; j < numRows; j++) {
            if (index > listOfLegendObjects.length - 1)
                continue;
            listOfLegendObjects[index].x = x;
            listOfLegendObjects[index].y = graph.height - (numRows - j) * (listOfLegendObjects[index].height + 4);
            index++;
        }
        x += listOfLegendObjects[i].getWidth(graph.context) + 4;
    }
}

function resizePieGraphLegend(listOfLegendObjects, radius, totalWidth, graph) {
    // set x and y coords
    var tempX = 0;
    var tempY = 0;
    var numRows = 1;
    var heightOffset = 0;
    var rowHeight = 0;
    var leftOffset = 25;
    if (graph.canvas.width > totalWidth + leftOffset * 2) {
        tempX = (graph.canvas.width / 2) - (totalWidth / 2);
        tempY = graph.height - (graph.height - radius * 2) / 4;
    } else {
        tempX = leftOffset;
        numRows = Math.ceil((totalWidth) / (graph.canvas.width - leftOffset * 2));
        heightOffset = ((graph.height - radius * 2) / 2) - 10;
        rowHeight = (heightOffset - 10 - 5 * numRows ) / numRows;
        tempY = (graph.height - (heightOffset - 5));
    }
    var heightIndex = 1;
    for (var i = 0; i < listOfLegendObjects.length; i++) {
        if (tempX + listOfLegendObjects[i].width > graph.canvas.width) {
            tempX = leftOffset;
            tempY = graph.height - (rowHeight * heightIndex) - 5 - ( 5 * heightIndex );
            heightIndex++;
        }
        listOfLegendObjects[i].x = tempX;
        listOfLegendObjects[i].y = tempY;
        //listOfLegendObjects[i].height = rowHeight;
        listOfLegendObjects[i].index = i;
        tempX += listOfLegendObjects[i].width;
    }
}

function resizeBarGraphBars(data, graph, bars) {
	var xList = getBarXList(data.length, graph);
	var yList = getBarYList(data, graph);
	
	for (var i = 0; i < data.length; i++) {
		var y = graph.height - (yList[i] + graph.labelOffset);
		bars[i].x = xList[i];
		bars[i].y = y;
		bars[i].width = graph.barWidth;
		bars[i].height = yList[i];
	}
}

function resizeMultiBarGraph(data, graph, bars) {
	var xList = getBarXList(data.length, graph);
	for (var i = 0; i < data.length; i++) {
		var yList = getBarYList(data[i].list, graph);
		for (var j = 0; j < data[i].list.length; j++) {
			var y = graph.height - (yList[j] + graph.labelOffset);
			var tempWidth = graph.barWidth / data[i].list.length;
			var tempBar = bars[i][j];
			tempBar.x = xList[i] + (tempWidth * j);
			tempBar.y = y;
			tempBar.width = tempWidth;
			tempBar.height = yList[j];
		}
	}
}

function resizeLineGraphPoints(data, graph, points) {
	for (var i = 0; i < data.length; i++) {
		var xList = getBarXList(data[i].length, graph);
		var yList = getBarYList(data[i], graph);
		for (var j = 0; j < data[i].length; j++) {
			var y = graph.height - (yList[j] + graph.labelOffset);
			points[i][j].x = xList[j] + (graph.barWidth / 2);
			points[i][j].y = y;
		}
	}
}

function resizeLineDetails(render) {
	var widthCollisonOffset = (render.objList[0][1].x - render.objList[0][0].x) / 2;
	for (var i = 0; i < render.mouse.dtBox.listOfDetailBoxs.length; i++) {
        var tDetail = render.mouse.dtBox.listOfDetailBoxs[i]
	    tDetail.x = render.objList[0][i].x;
	    tDetail.collisionWidth = widthCollisonOffset;
	}
}

function resizePieGraphPieces(data, graph, pieces, render) {
	var cx = graph.canvas.width / 2;
	var cy = render.legendList[0].y / 2;
	if (render.legendList[0].y < graph.canvas.height / 2 || render.legendList[0].y < 0) {
	    cy = graph.canvas.height / 2;
	    render.shouldDrawPieLegend = false;
	} else {
	    render.shouldDrawPieLegend = true;
	}
    //var r = (graph.canvas.width * .25);
	var r = cy * .8;
	if (r < 0) // check for negative radius
	    r = 0;
	for (var i = 0; i < data.length; i++) {
		pieces[i].x = cx;
		pieces[i].y = cy;
		pieces[i].radius = r;
	}
}

function resizeHalfGauge(r) {
    var curTime = (new Date).getTime();
    var timeDif = curTime - r.lastResize;

    if (timeDif < 1000 / 10) {
        return;
    };
    r.lastResize = curTime;
    var elem = document.getElementById(r.id);
    r.c.height = elem.clientWidth * (3 / 4);
    r.c.width = elem.clientWidth;
    r.c.height = r.g.canvas.height * (5 / 8);
    r.g.setSize(r.c.height, r.c.width, r.numData);
    r.g.context.clearRect(0, 0, r.g.canvas.width, r.g.canvas.height);
    r.drawGraph();
}

function getFontSize(text, size, maxWidth, context) {
	context.font = size.toString() + 'pt sans-serif';
	context.fillStyle = 'black';
	context.textAlign = 'left';
	while(context.measureText(text).width > maxWidth) {
		size--;
		context.font = size.toString() + 'pt sans-serif';
	}
}

function getMinFontSize(data, size, maxWidth, context) {
    var minSize = size;
    context.font = size.toString() + 'pt sans-serif';
    for (var i = 0; i < data.length; i++) {
        while (context.measureText(data[i].label).width > maxWidth) {
            minSize--;
            context.font = minSize.toString() + 'pt sans-serif';
        }
    }
    return minSize;
}

function drawLabel(text,x,y,heightOffset,context) {
	//var fontSize = 20;
	context.translate(x,y);
	context.rotate(Math.PI / 4);
    context.fillStyle = 'black'
	context.font = heightOffset.toString() + 'pt sans-serif';
    //getFontSize(text,25,(heightOffset - 5) / Math.sin(45),context);
	//context.font = '10pt sans-serif';
	context.fillText(text,0,0);
	context.rotate(-Math.PI / 4);
	context.translate(-x,-y);
}

function drawLegend(legendObjects, context) {
    for (var i = 0; i < legendObjects.length; i++) {
        legendObjects[i].draw(context);
    }
}

function drawHalfPiece(context, c) {
    context.beginPath();

    if (this.isJutted) {
        var tempX = this.x + (this.radius * .1) * Math.cos(((this.eAngle - this.sAngle) / 2 + this.sAngle) * Math.PI);
        var tempY = this.y + (this.radius * .1) * Math.sin(((this.eAngle - this.sAngle) / 2 + this.sAngle) * Math.PI);
        //context.moveTo(tempX, tempY);
        this.drawJut(tempX, tempY);
    } else {
        context.arc(this.x, this.y, this.radius, this.sAngle * Math.PI, this.eAngle * Math.PI, false);
        context.arc(this.x, this.y, this.radius / 2, this.eAngle * Math.PI, this.sAngle * Math.PI, true);        
        context.lineTo(this.x + this.radius * Math.cos(this.sAngle * Math.PI), this.y + this.radius * Math.sin(this.sAngle * Math.PI))
        context.fillStyle = getColor(this.color);
        context.fill();
        context.strokeStyle = 'black';
        context.stroke();
        
        /*context.beginPath();
        context.arc(this.x, this.y, this.radius / 2, this.sAngle * Math.PI, this.eAngle * Math.PI);
        context.fillStyle = 'white';
        context.fill();*/
    }
}

function drawHalfJut(x, y) {
    var context = this.render.g.context;
    context.arc(x, y, this.radius, this.sAngle * Math.PI, this.eAngle * Math.PI, false);
    context.arc(x, y, this.radius / 2, this.eAngle * Math.PI, this.sAngle * Math.PI, true);
    context.lineTo(x + this.radius * Math.cos(this.sAngle * Math.PI), y + this.radius * Math.sin(this.sAngle * Math.PI))
    context.fillStyle = getColor(this.color);
    context.fill();
    context.strokeStyle = 'black';
    context.stroke();
}

function getTotalValue(data) {
	var total = 0;
	for (var i = 0; i < data.length; i++) {
		total += data[i].value;
	}
	return total;
}

function getTotalWidth(list) {
	var total = 0;
	for (var i = 0; i < list.length; i++) {
		total += list[i].width;
	}
	return total;
}

function getColorList(start, end, numObj) {
    var colorList = [];
    if (end > start) {
        for (var i = 0; i < numObj; i++) {
            colorList[i] = start + (i * ((end - start) / numObj));
        }
    } else {
        for (var i = 0; i < numObj; i++) {
            colorList[i] = start - (i * ((start - end) / numObj));
        }
    }
	return colorList;
}

function getColor(color) {
    var temp = HUSL.toRGB(color, 100, 46);
    return "rgb(" + (Math.floor(temp[0] * 255)) + ", " + (Math.floor(temp[1] * 255)) + ", " + (Math.floor(temp[2] * 255)) + ")";
}

function renderGraph(settings) {
	var temp = this;
    this.g = null;
    this.objList = null;
    this.mouse = null;
	this.dtBox = null;
    this.c = null;
	this.d = null;
	this.id = '';
	this.rangeStart = settings.rangeStart;
	this.rangeEnd = settings.rangeEnd;
	this.s = settings;
	this.lastResize = 0;
	this.numData = 0;
	this.colorList = null;
	this.aObj = null;
	this.legendList = [];
	this.labelList = [];
	this.labelFontSize = 10;
	this.shouldDrawPieLegend = true;
};
renderGraph.prototype.isMouseOver = function (x, y, render) {
	if (render.c === undefined)
		return false;
	var r = render.c.getBoundingClientRect();
	if (x > r.left && x < r.right && y > r.top && y < r.bottom)
		return true;
	return false;
}
renderGraph.prototype.initTachAnim = function () {
	this.aObj = new animationObject();
	var tachProp = new animationProperty(settings.rangeStart, temp.d.value);
	this.aObj.propertyList.push(tachProp);
};
renderGraph.prototype.initPieAnim = function () {
	this.aObj = new animationObject();
	for (var i = 0; i < this.objList.length; i++) {
		var lAngle = new animationProperty(0, this.objList[i].sAngle);
		var rAngle = new animationProperty(0, this.objList[i].eAngle);
		var radius = new animationProperty(0, this.objList[i].radius);
		var color = new animationProperty(0, this.objList[i].color);
		//var piecePropList = [lAngle, rAngle, radius, color];
		//temp.aObj.propertyList.push(piecePropList);
		this.aObj.propertyList.push(lAngle);
		this.aObj.propertyList.push(rAngle);
		this.aObj.propertyList.push(radius);
		this.aObj.propertyList.push(color);
	}
};
renderGraph.prototype.initLineAnim = function () {
	this.aObj = new animationObject();
	/*for (var i = 0; i < temp.objList.length; i++) {
		for (var j = 0; j < temp.objList[i].length; j++) {
			var xProp = new animationProperty(temp.g.leftOffset, temp.objList[i][j].x);
			//var yProp = new animationProperty(temp.g.labelOffset, temp.objList[i][j].y);
			temp.aObj.propertyList.push(xProp);
			//temp.aObj.propertyList.push(yProp);
		}
	}*/
	this.aObj.propertyList.push(new animationProperty(temp.g.leftOffset + temp.g.gridLabelOffset, temp.g.width - temp.g.rightOffset));
};
renderGraph.prototype.initBarAnim = function () {
	this.aObj = new animationObject();
	for (var i = 0; i < this.objList.length; i++) {
		var barHeightProp = new animationProperty(0, this.objList[i].height);
		var barYProp = new animationProperty(this.g.height - this.g.labelOffset - .5, this.objList[i].y);
		barYProp.update = negUpdate;
		this.aObj.propertyList.push(barHeightProp);
		this.aObj.propertyList.push(barYProp);
	}
};
renderGraph.prototype.initMultiBarAnim = function () {
	this.aObj = new animationObject();
	for (var i = 0; i < this.objList.length; i++) {
		for (var j = 0; j < this.objList[i].length; j++) {
			var barHeightProp = new animationProperty(0, this.objList[i][j].height);
			var barYProp = new animationProperty(this.g.height - this.g.labelOffset - .5, this.objList[i][j].y);
			barYProp.update = negUpdate;
			this.aObj.propertyList.push(barHeightProp);
			this.aObj.propertyList.push(barYProp);
		}
	}
}
renderGraph.prototype.updateTach = function (percent) {
	if (this.aObj.propertyList[0].percentDone > 1) {
		this.d.value = this.aObj.propertyList[0].end;
	}
	this.aObj.updateObj(percent);
	this.d.value = this.aObj.propertyList[0].tempValue;
}
renderGraph.prototype.updatePie = function (percent) {
	this.aObj.updateObj(percent);
	var offsetIndex = 0;
	for (var i = 0; i < this.objList.length; i++) {
		var index = i + offsetIndex;
		var tempPiece = this.objList[i];
		tempPiece.sAngle = this.aObj.propertyList[index].tempValue;
		tempPiece.eAngle = this.aObj.propertyList[index + 1].tempValue;
		tempPiece.radius = this.aObj.propertyList[index + 2].tempValue;
		tempPiece.color = this.aObj.propertyList[index + 3].tempValue;
		offsetIndex += 3;
	}
}
renderGraph.prototype.updateLine = function (percent) {
	this.aObj.updateObj(percent);
	/*var offsetIndex = 0;
	for (var i = 0; i < this.objList.length; i++) {
		for (var j = 0; j < this.objList[i].length; j++) {
			var tempPoint = this.objList[i][j];
			tempPoint.x = this.aObj.propertyList[offsetIndex++].tempValue;
			//tempPoint.y = this.aObj.propertyList[offsetIndex++].tempValue;
		}
	}*/
}
renderGraph.prototype.updateBar = function (percent) {
	this.aObj.updateObj(percent);
	var indexOffset = 0;
	for (var i = 0; i < this.objList.length; i++) {
		this.objList[i].height = this.aObj.propertyList[indexOffset++].tempValue;
		this.objList[i].y = this.aObj.propertyList[indexOffset++].tempValue;
	}
}
renderGraph.prototype.updateMultiBar = function (percent) {
	this.aObj.updateObj(percent);
	var indexOffset = 0;
	for (var i = 0; i < this.objList.length; i++) {
		for (var j = 0; j < this.objList[i].length; j++) {
			this.objList[i][j].height = this.aObj.propertyList[indexOffset++].tempValue;
			this.objList[i][j].y = this.aObj.propertyList[indexOffset++].tempValue;
		}
	}
}
renderGraph.prototype.drawGraph = function () {
	this.g.context.clearRect(0, 0, this.c.width, this.c.height);
	this.g.drawLayout();
	for (var i = 0; i < this.objList.length; i++) {
		this.objList[i].draw(this.g.context,getColor(this.objList[i].color));
		//var x = this.objList[i].x + (this.objList[i].width / 2);
		var x = this.objList[i].x + this.g.barWidth / 2;
		//var y = this.objList[i].y + this.objList[i].height + 8;
		var y = this.g.height - this.g.labelOffset + 8;
		drawLabel(this.d[i].label,x,y,this.labelFontSize,this.g.context);
	}
};
renderGraph.prototype.drawMultiGraph = function () {
	this.g.context.clearRect(0, 0, this.c.width, this.c.height);
	this.g.drawLayout();
	for (var i = 0; i < this.objList.length; i++) {
		var listObj = this.objList[i];
		for (var j = 0; j < listObj.length; j++) {
			listObj[j].draw(this.g.context, getColor(listObj[j].color));
		}
		var tempTotal = getTotalWidth(listObj);
		var x = listObj[0].x + ( tempTotal / 2 );
		//var y = listObj[0].y + listObj[0].height + 8;
		var y = this.g.height - this.g.labelOffset + 8;
		drawLabel(this.d[i].label, x, y, this.labelFontSize, this.g.context);
	}
};
renderGraph.prototype.drawLineGraph = function () {
	this.g.context.clearRect(0, 0, this.g.canvas.width, this.g.canvas.height);
	this.g.drawLayout();
	for (var i = 0; i < this.objList.length; i++) {
		if (this.objList[i].length > 1) {
			for (var j = 1; j < this.objList[i].length; j++) {
				var p = this.objList[i][j - 1];
				var nextP = this.objList[i][j];
				this.g.context.beginPath();
				this.g.context.moveTo(p.x, p.y);
				this.g.context.lineTo(nextP.x, nextP.y);
				this.g.context.strokeStyle = getColor(this.colorList[i]);
				this.g.context.stroke();
				p.draw(this.g.context, getColor(this.colorList[i]));
			}
			this.objList[i][this.objList[i].length - 1].draw(this.g.context, getColor(this.colorList[i])); //this.objList[i][this.objList[i].length - 1].color
		} else {
		
		}
	}
	for (var k = 0; k < this.s.labels.length; k++) {
		var xTemp = this.objList[0][k].x;
		var yTemp = this.g.height - this.g.labelOffset + 8;
		drawLabel(this.s.labels[k], xTemp, yTemp, this.labelFontSize, this.g.context);
	}
	this.g.context.strokeStyle = 'grey';
}
renderGraph.prototype.drawLineAnim = function () {
	var cont = this.g.context;
	cont.clearRect(0, 0, this.c.width, this.c.height);
	this.drawLineGraph();
	
	cont.beginPath();
	cont.rect(this.aObj.propertyList[0].tempValue, this.g.topOffset, (this.g.width - this.g.rightOffset) - this.aObj.propertyList[0].tempValue, this.g.height - this.g.topOffset - this.g.labelOffset - 0.5);
	cont.fillStyle = 'white';
	cont.fill();
	this.g.addGridLines();
}
renderGraph.prototype.drawGauge = function () {
	//var percent = this.d.value / (this.rangeEnd - this.rangeStart);
	var percent = this.aObj.propertyList[0].tempValue / (this.rangeEnd - this.rangeStart);
	var radius = (this.c.width * 1/2) / 2;
	var lineW = radius * .4;
	var x = this.c.width / 2;
	var y = this.c.height / 2;
	
	var startAngle = .75 * Math.PI;
	//var startAngle = 1 * Math.PI;
	//var endAngle = 2 * Math.PI;
	var endAngle = 2.25 * Math.PI;
	var valueAngle = ((2.25 - .75) * percent) + .75;
	
	var counterClockwise = false;
	var context = this.g.context;
	
	var rx = x - (radius * .5);
	var ry = y + (radius * .2) //+ 2 * (radius * .2);
	var rw = 2 * (radius * .5);
	var rh = 2 * (radius * .25);
	
	context.clearRect(0, 0, this.g.canvas.width, this.g.canvas.height);
	context.beginPath(); // background of graph
	context.arc(x, y, radius * 1.4, 0, 2 * Math.PI, counterClockwise);
	context.lineWidth = lineW * .025
	context.strokeStyle = 'black';
	context.stroke();
	context.fillStyle = 'grey';
	context.fill();
	
	context.beginPath(); // empty gauge
	context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
	context.lineWidth = lineW;
	context.strokeStyle = 'white';
	context.stroke();
	
	context.beginPath(); // gauge percent
	context.arc(x, y, radius, startAngle, valueAngle * Math.PI, counterClockwise);
	context.lineWidth = lineW + 2;
	var colorValue = Math.abs(this.s.colorEnd - ((Math.abs(this.s.colorEnd - this.s.colorStart)  * percent)));
	context.strokeStyle = getColor(colorValue);
	context.stroke();
	
	context.beginPath(); // gauge value box
	context.rect(rx, ry, rw, rh);
	context.fillStyle = 'black';
	//context.fill();
	//context.lineWidth = 5;
	//context.strokeStyle = 'black';
	//context.stroke();
	
	context.font = rh + 'pt sans-serif'; // gauge value
	context.textAlign = 'center';
	context.fillStyle = 'white';
	context.fillText(Math.floor(percent * 100).toString() + '%', x, ry ); //ry + (rh/1.1)
}
renderGraph.prototype.drawHalfGauge = function() {
	//var percent = this.d.value / (this.rangeEnd - this.rangeStart);
	var percent = this.aObj.propertyList[0].tempValue / (this.rangeEnd - this.rangeStart);
	var radius = (this.c.width * 1/2) / 2;      
	var lineW = radius * .4;
	var x = this.c.width / 2;
	var y = this.c.height - (( this.c.height - radius) / 2);
	
	var startAngle = 1;
	var endAngle = 2;
	var valueAngle = ((endAngle - startAngle) * percent) + startAngle;
	
	var counterClockwise = false;
	var context = this.g.context;
	
	var rx = x - (radius * .5);
	var ry = y; //- (radius * .2) //+ 2 * (radius * .2);
	var rw = 2 * (radius * .5);
	var rh = 2 * (radius * .2);
	
	context.clearRect(0, 0, this.g.canvas.width, this.g.canvas.height);
	context.beginPath(); // empty gauge
	context.arc(x, y, radius, startAngle * Math.PI, endAngle * Math.PI, counterClockwise);
	context.lineWidth = lineW;
	context.strokeStyle = 'grey';
	context.stroke();
	
	context.beginPath(); // gauge percent
	context.arc(x, y, radius, startAngle * Math.PI, valueAngle * Math.PI, counterClockwise);
	context.lineWidth = lineW + 1;
	context.strokeStyle = getColor(Math.abs(this.s.colorEnd - ((Math.abs(this.s.colorEnd - this.s.colorStart)  * percent))));
	context.stroke();
	
	context.font = rh + 'pt sans-serif';
	context.textAlign = 'center';
	context.fillStyle = 'grey';
	context.fillText(Math.floor(this.d.value).toString(), x, ry);
	
	context.font = (rh * .4).toString() + 'pt sans-serif';
	context.fillText(this.rangeStart.toString(), x - (radius + lineW /2 + (radius * .15)) , ry);
	context.fillText(this.rangeEnd.toString(), x + (radius + lineW/2 + (radius * .25)) , ry);
}
renderGraph.prototype.drawTach = function () {
	//var percent = this.d.value / (this.rangeEnd - this.rangeStart);
	var percent = this.aObj.propertyList[0].tempValue / Math.abs(this.rangeEnd - this.rangeStart);
	var radius = (this.c.width * .25);
	var x = this.c.width / 2;
	var y = this.c.height / 2;
	
	var startAngle = .8;
	var endAngle = 2.2;
	var valueAngle = ((endAngle - startAngle) * percent) + startAngle;
	
	var counterClockwise = false;
	var context = this.g.context;
	
	var rx = x - (radius * .5);
	var ry = y;
	var tickWidth = radius * .05;
	
	context.clearRect(0, 0, this.g.canvas.width, this.g.canvas.height);
	context.beginPath(); // backgroud of tach circle
	context.arc(x, y, radius + (radius * .1), 0, 2 * Math.PI, false);
	context.fillStyle = 'grey';
	context.fill();
	
	context.beginPath(); // white space 
	context.moveTo(x, y);
	context.arc(x, y, radius, startAngle * Math.PI, endAngle * Math.PI, false);
	context.fillStyle = 'white';
	context.fill();
	context.lineWidth = tickWidth;
	context.stroke();
	
	var numTicks = 10;
	var angleTemp = startAngle;
	//var tickWidth = radius * .05;
	var angle = angleTemp;
	var lineLength = radius + (tickWidth / 2);
	var xTemp = x + lineLength * Math.cos(angle * Math.PI);
	var yTemp = y + lineLength * Math.sin(angle * Math.PI);
	context.beginPath();
	context.moveTo(x, y);
	context.lineTo(xTemp, yTemp);
	context.lineWidth = tickWidth;
	context.stroke();
	for (var i = 0; i < numTicks; i++) {
		angle = ((endAngle - startAngle) / numTicks) + angleTemp;
		xTemp = x + lineLength * Math.cos(angle * Math.PI);
		yTemp = y + lineLength * Math.sin(angle * Math.PI);
		context.beginPath();
		context.moveTo(x, y);
		context.lineTo(xTemp, yTemp);
		context.lineWidth = tickWidth;
		context.stroke();
		angleTemp = angle;
	}
	
	context.beginPath(); // white space over ticks
	context.moveTo(x, y);
	context.arc(x, y, radius * .9, startAngle * Math.PI, endAngle * Math.PI, false);
	context.fillStyle = 'white';
	context.fill();
	
	// draw tick numbers
	context.beginPath();
	context.fillStyle = 'black';
	context.textAlign = 'center';
	context.font = '8pt sans-serif'
	for (var i = 1; i < numTicks ; i++) {
		var lx = x + (radius * .7) * Math.cos((startAngle + (endAngle - startAngle) * (i / numTicks)) * Math.PI);
		var ly = y + (radius * .7) * Math.sin((startAngle + (endAngle - startAngle) * (i / numTicks)) * Math.PI);
		var l = (this.rangeStart + (i / numTicks) * Math.abs(this.rangeEnd - this.rangeStart)).toString()
		context.fillText( l, lx, ly);
	}

	// draw needle
	var needleWidth = tickWidth;
	var offsetRadius = radius * .05;
	var xValue = x + (radius * .85) * Math.cos(valueAngle * Math.PI);
	var yValue = y + (radius * .85) * Math.sin(valueAngle * Math.PI);
	//var offsetRadius = (radius * .9) * Math.tan(needleAngle);
	var xRight = x + (offsetRadius * Math.cos((valueAngle + .5) * Math.PI));
	var yRight = y + (offsetRadius * Math.sin((valueAngle + .5) * Math.PI));
	var xLeft = x + (offsetRadius * Math.cos((valueAngle - .5) * Math.PI));
	var yLeft = y + (offsetRadius * Math.sin((valueAngle - .5) * Math.PI));
	context.beginPath();
	context.moveTo(x, y);
	context.lineTo(xLeft, yLeft);
	context.lineTo(xValue, yValue);
	context.lineTo(xRight, yRight);
	context.lineTo(x, y);
	context.fillStyle = getColor(Math.abs(this.s.colorEnd - ((Math.abs(this.s.colorEnd - this.s.colorStart)  * percent))));
	context.fill();
	
	context.beginPath();
	context.arc(x, y, (radius * .1), 0 , 2 * Math.PI, false);
	context.fillStyle = 'black';
	context.fill();
}
renderGraph.prototype.drawPieGraph = function () {
	var context = this.g.context;
	context.clearRect(0, 0, this.g.canvas.width, this.g.canvas.height);
	for (var i = 0; i < this.d.length; i++) {
		this.objList[i].draw(this.g.context, this.objList[i].color);
	}
	if (this.shouldDrawPieLegend)
		drawLegend(this.legendList, this.g.context);
}
renderGraph.prototype.drawDoughnutGraph = function () {
	this.drawPieGraph();
	var obj = this.objList[0];
	this.g.context.beginPath();
	this.g.context.arc(obj.x, obj.y, obj.radius * .5, 0, 2 * Math.PI, false);
	this.g.context.fillStyle = 'white';
	this.g.context.fill();
	this.g.context.strokeStyle = 'black';
	this.g.context.stroke();
	//drawLegend(this.legendList, this.g.context);
}
renderGraph.prototype.resizeGraph = function (r) {
	var curTime = (new Date).getTime();
	var timeDif = curTime - r.lastResize;

	if (timeDif < 1000 / 60) {
		return;
	};
	r.lastResize = curTime;
	var elem = document.getElementById(r.id);
	r.c.height = elem.clientWidth * (3 / 4);
	r.c.width = elem.clientWidth;
	r.g.setSize(r.c.height,r.c.width,r.numData);
	r.g.context.clearRect(0, 0, r.g.canvas.width, r.g.canvas.height);
	r.resizeObjects(r.d, r.g, r.objList);
	r.drawGraph();
};
renderGraph.prototype.resizeObjects = function (data, graph, objectList) { };

function elemOnMouseOut(){
	this.dtBox.deActivate();
}
renderGraph.prototype.init = function (data, id) {
	this.d = data;
	this.id = id;
	this.g = new graph();
	this.g.init(id, this.numData, this.s);
	this.c = this.g.canvas;
	this.dtBox = new detailBox(0,0,'test',this);
	this.mouse = new canvasGraphMouse();
	this.mouse.init(this);
	var elem = document.getElementById(id);
	//elem.onmouseenter = function () { this.mouse.isActive = true };
	elem.onmouseout = elemOnMouseOut.bind(this);
	this.labelFontSize = getMinFontSize(this.d, 25, (this.g.labelOffset - 5) / Math.sin(45), this.g.context);
	this.colorList = getColorList(this.s.colorStart, this.s.colorEnd, this.numData);
	var temp = this;
	//window.addEventListener('resize',function(evt) {temp.resizeGraph(temp)});
};
renderGraph.prototype.createBarGraph = function (data, id) {
	this.numData = data.length;
	this.init(data,id);
	this.objList = getBarGraphBars(data, this.g);
			
	for (var i = 0; i < this.objList.length; i++) {
		this.objList[i].dtBox = this.dtBox;
		this.objList[i].render = this;
		this.objList[i].color = this.colorList[i];
		this.mouse.add(this.objList[i]);
	}
	this.drawGraph();
	//mouseObj.objList = this.objList;
	this.resizeObjects = resizeBarGraphBars;
	var animatorer = new animator(1, 100, .1, this.drawGraph.bind(this), this.initBarAnim.bind(this), this.updateBar.bind(this));
	animatorer.animate(animatorer);
};
renderGraph.prototype.createMultiBarGraph = function (data, id) {
	this.numData = data.length;
	this.init(data, id);
	this.colorList = getColorList(this.s.colorStart, this.s.colorEnd, data[0].list.length);
	this.objList = getMultiBarGraphBars(data, this.g);
	this.drawGraph = this.drawMultiGraph;
	this.resizeObjects = resizeMultiBarGraph;
	
	for (var i = 0; i < this.objList.length; i++) {
		for (var j = 0; j < this.objList[i].length; j++) {
			this.objList[i][j].dtBox = this.dtBox;
			this.objList[i][j].render = this;
			this.objList[i][j].color = this.colorList[j];
			this.mouse.add(this.objList[i][j]);
		}
	}
	this.drawMultiGraph();
	var animatorer = new animator(1, 100, .1, this.drawGraph.bind(this), this.initMultiBarAnim.bind(this), this.updateMultiBar.bind(this));
	animatorer.animate(animatorer);
};
renderGraph.prototype.createLineGraph = function (data, id) {
	this.numData = data[0].length;
	this.init(data, id);
	this.colorList = getColorList(this.s.colorStart, this.s.colorEnd, data.length);
	this.d = data;
	this.objList = getLineGraphPoints(data, this.g);
	this.drawLineGraph();
	this.drawGraph = this.drawLineGraph;
	this.resizeObjects = function (d, g, p) {
		resizeLineGraphPoints(d, g, p);
		resizeLineDetails(this);
	}
	var parentDetailObj = new detailListParent(this);
	this.mouse.dtBox = parentDetailObj;
	var detailObjList = [];
	var widthCollisonOffset = (this.objList[0][1].x - this.objList[0][0].x) / 2;

	// init mouse objects
	for (var i = 0; i < this.objList[0].length; i++) {
		var tempDetailObj = new detailListBox(this.objList[0][i].x, 0, i, this.s.labels[i], this, parentDetailObj);
		tempDetailObj.intervalLabel = this.s.labels[i];
		tempDetailObj.collisionWidth = widthCollisonOffset;
		detailObjList.push(tempDetailObj);
	}

	for (var i = 0; i < this.objList.length; i++) {
		for (var j = 0; j < this.objList[i].length; j++) {
			this.objList[i][j].dtBox = this.dtBox;
			this.objList[i][j].render = this;
			detailObjList[j].valueLabelPairs.push(data[i][j]);
			//this.mouse.add(this.objList[i][j]);
		}            
	}
	this.mouse.objList = detailObjList;
	parentDetailObj.listOfDetailBoxs = detailObjList;
	var animatorer = new animator(1, 100, .1, this.drawLineAnim.bind(this), this.initLineAnim.bind(this), this.updateLine.bind(this));
	animatorer.animate(animatorer);
}
renderGraph.prototype.createPieGraph = function (data, id, isDoughtnut) {
	this.numData = data.length;		
	this.init(data, id);
	var tempReturns = getPieGraphLegend(data, this.colorList, 0, this.g);
	this.legendList = tempReturns[0];
	data = tempReturns[1];
	this.objList = getPieGraphPieces(data, this.g, this);
	this.drawGraph = this.drawPieGraph;

	this.resizeObjects = function (resizeData, resizeGraph, rePieces) {
		
		var totalWidth = 0;
		for (var i = 0; i < this.legendList.length; i++) {
			totalWidth += this.legendList[i].getWidth(this.g.context);
		}
		resizePieGraphLegendR2(this.legendList, 0, totalWidth, this.g);
		resizePieGraphPieces(resizeData, resizeGraph, rePieces, this);
	}

	var nY = (this.g.height - (this.g.height - this.legendList[0].y)) / 2;
	for (var i = 0; i < this.objList.length; i++) {
		this.objList[i].dtBox = this.dtBox;
		this.objList[i].render = this;
		this.objList[i].color = this.colorList[i];
		this.objList[i].y = nY;
		this.mouse.add(this.objList[i]);
		this.mouse.add(this.legendList[i]);
	}
	//this.drawPieGraph();
	if(isDoughtnut) {
		this.drawGraph = this.drawDoughnutGraph;
		for (var i = 0; i < this.objList.length; i++) {
			this.objList[i].draw = drawHalfPiece;
			this.objList[i].drawJut = drawHalfJut;
		}
		this.drawDoughnutGraph();
	}
	
	var animatorer = new animator(0, 100, .1, this.drawGraph.bind(this), this.initPieAnim.bind(this), this.updatePie.bind(this));
	animatorer.animate(animatorer);
	this.drawPieGraph();
}
renderGraph.prototype.createGauge = function (data, id, isHalfGauge) {
	this.numData = 1;
	this.init(data, id);
	if (isHalfGauge) {
		this.drawHalfGauge();
		this.g.canvas.height = this.g.canvas.height * (5 / 8);
		this.resizeGraph = resizeHalfGauge;
		this.drawGraph = this.drawHalfGauge;
	} else {
		this.drawGauge();
		this.drawGraph = this.drawGauge;
	}
	//resizeBarGraphBars = function (a, b, c) { };
	var tempInit = this.initTachAnim;
	var tempUpdate = this.updateTach;
	var animatorer = new animator(this.s.rangeStart, this.d.value, .1, this.drawGraph.bind(this), tempInit, tempUpdate);
	animatorer.animate(animatorer);
}
renderGraph.prototype.createTach = function (data, id) {
	this.numData = 1;
	this.init(data, id);
	this.drawTach();
	this.drawGraph = this.drawTach;
	//resizeBarGraphBars = function (a, b, c) { };
	var iTach = this.initTachAnim;
	var uTach = this.updateTach;
	var animatorer = new animator(this.s.rangeStart, this.d.value, .1, this.drawGraph.bind(this), iTach, uTach);
	animatorer.animate(animatorer);
	this.drawTach();
};

/************************************* Animator ***********************************/

function negUpdate(percent) {
	this.percentDone = percent;
	this.tempValue = this.start - (Math.abs(this.start - this.end) * this.percentDone);
}

function animationProperty(start, end) {
	this.start = start;
	this.end = end;
	this.percentDone = 0;
	this.tempValue = start;
	this.update = function (percent) {
		this.percentDone = percent;
		this.tempValue = (Math.abs(this.end - this.start) * this.percentDone) + this.start;
	}
}

function animationObject() {
	this.propertyList = [];
	this.percentDone = 0;
	this.start = 0;
	this.end = 0;
	this.tempValue = 0;
	this.draw = null;
	this.updateObj = function(percent) {
		for (var i = 0; i < this.propertyList.length; i++) {
			this.propertyList[i].update(percent);
		}
	}
}

function animator(start, end, unitsPerCycle, drawFunc, initFunc, updateFunc) {
	this.startValue = start;
	this.endValue = end;
	this.rate = unitsPerCycle;
	this.draw = drawFunc;
	this.init = initFunc;
	this.update = updateFunc;
	this.startTimer = null;
}

animator.prototype.animate = function(obj) {
	obj.init();
	var t = (1000 / 40); // 1000 / framesPerSecond
	var lastFrame = (new Date()).getTime();
	var currentPercent = 0;
	var currentValue = obj.startValue;
	var s = obj.startValue;
	var e = obj.endValue;
	var r = obj.rate;
	
	obj.startTimer = setInterval(function () {
		var now = (new Date()).getTime();
		var deltaTime = now - lastFrame;
		var time = deltaTime / t;
		
		var stepValue = time * r;
		currentValue += stepValue;
		currentPercent = currentValue / (e - s);
	}, t);
	animator.prototype.animate = function (obj) {
		if (currentPercent < 1) {
			obj.update(currentPercent);
			obj.draw();
			requestAnimFrame(function () {
				obj.animate(obj);
			});
		} else {
			clearInterval(obj.startTimer);
			obj.update(1);
			obj.draw();
		}
	};
}

// setup requestAnimFrame() function to be able to call in animation loop
window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();

/************************************* Mouse **************************************/

//var mouseObj = null;
var iCount = 0;
function canvasGraphMouse() {
    this.objList = [];
    this.isActive = false;
    this.eventsSet = false;
    this.lastHover = -1;
    this.coords = { x: 0, y: 0, r: 4 };
    this.lastRan = 0;
    this.canvas = null;
    this.render = null;
	this.dtBox = null;
};

canvasGraphMouse.prototype.add = function (object) {
	this.objList.push(object);
};
canvasGraphMouse.prototype.checkClick = function (evt) {
	if (this.isActive) {
		for (var i = 0; i < this.objList.length; i++) {
			if (this.objList[i].isCollision(this.coords.x, this.coords.y, this.coords.r)) {
				//document.getElementById('status').innerHTML = this.objList[i].isCollision(this.coords.x, this.coords.y, this.coords.r).toString();
				this.render.g.context.beginPath();
				this.render.g.context.arc(this.coords.x,this.coords.y,this.coords.r,0,2 * Math.PI, false);
				this.render.g.context.fillStyle = 'red';
				this.render.g.context.fill();
				//this.isActive = false;
				//this.objList[i].onClick(i, this.render);
				return i;
			}
		}
	}
}
canvasGraphMouse.prototype.checkHover = function () {
	if (this.isActive) {
		for (var i = 0; i < this.objList.length; i++) {
			var temp = this.objList[i].isCollision(this.coords.x, this.coords.y, this.coords.r);
			//document.getElementById('status').innerHTML = temp.toString() + (++iCount).toString();
			if (temp && this.lastHover < 0) {
				
				this.lastHover = i;
				this.dtBox.update(this.coords.x, this.coords.y, this.objList[this.lastHover].label, this.objList[this.lastHover].value);
				this.objList[i].onHover(this.render);
				return i;
			} else if (this.lastHover === i && !temp) {
				this.objList[i].offHover(this.render);
				this.lastHover = -1;
			}
		}
	}
}
canvasGraphMouse.prototype.updateCoords = function (evt) {
	if (this.isActive) {
		var curTime = (new Date).getTime()
		var timeDif = curTime - this.lastRan;

		if (timeDif < 1000 / 40) {
			return;
		}
		this.lastRan = curTime;

		var thing = this.canvas.getBoundingClientRect();
		this.coords.x = evt.clientX - thing.left;
		this.coords.y = evt.clientY - thing.top;
		if (this.lastHover > -1) {
			this.dtBox.update(this.coords.x,this.coords.y,this.objList[this.lastHover].label, this.objList[this.lastHover].value);
		}
		//document.getElementById('status').innerHTML = this.coords.x + ", " + this.coords.y;
		this.checkHover();
	}
}
canvasGraphMouse.prototype.init = function (render) {
	var mObj = this
	if (!this.eventsSet) {
		render.c.addEventListener('mousemove', function (evt) { mObj.updateCoords(evt) });
		render.c.addEventListener('click', function (evt) { mObj.checkClick(evt) });
		this.eventsSet = true;
	}
	mObj.dtBox = render.dtBox;
	mObj.canvas = render.c;
	mObj.render = render;
	mObj.isActive = true;
}

