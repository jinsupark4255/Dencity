import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const AgePieChart = ({ data, width, height }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    d3.select(chartRef.current).select('svg').remove();

    const colorScale = d3.scaleOrdinal()
      .domain(data.map(item => item.ageGroup))
      .range(['#FFE45C', '#FD7B49', '#E8395C', '#B137A3', '#6957CB','#43ABAF']);

    const pie = d3.pie().value(d => d.value)
    .sort(null)
      .startAngle(-Math.PI / 2) // 왼쪽에서 오른쪽으로 위로 향하는 반원 시작 각도
      .endAngle(Math.PI / 2); // 왼쪽에서 오른쪽으로 위로 향하는 반원 종료 각도

    const arc = d3.arc()
      .innerRadius(Math.min(width, height) / 6)
      .outerRadius(Math.min(width, height) / 2);

      const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const arcs = svg.selectAll("g")
      .data(pie(data))
      .enter()
      .append('g');

    arcs.append('path')
      .attr('d', arc)
      .attr('fill', d => colorScale(d.data.ageGroup));

    arcs.append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'middle')
      .style('font-size', '9px') // 글꼴 크기 설정
      .style('fill', 'black') // 텍스트 색상 설정
      .text(d => d.data.ageGroup);
  }, [data, width, height]);

  return (
    <div ref={chartRef}></div>
  );
};

export default AgePieChart;
