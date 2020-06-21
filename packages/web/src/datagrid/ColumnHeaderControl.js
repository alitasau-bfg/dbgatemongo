import React from 'react';
import styled from 'styled-components';
import ColumnLabel from './ColumnLabel';
import DropDownButton from '../widgets/DropDownButton';
import { DropDownMenuItem, DropDownMenuDivider } from '../modals/DropDownMenu';
import { useSplitterDrag } from '../widgets/Splitter';
import { FontIcon } from '../icons';
import { isTypeDateTime } from '@dbgate/tools';

const HeaderDiv = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;

const LabelDiv = styled.div`
  flex: 1;
  min-width: 10px;
  // padding-left: 2px;
  padding: 2px;
  margin: auto;
  white-space: nowrap;
`;

const IconWrapper = styled.span`
  margin-left: 3px;
`;

const ResizeHandle = styled.div`
  background-color: #ccc;
  width: 2px;
  cursor: col-resize;
  z-index: 1;
`;

const GroupingLabel = styled.span`
  color: green;
  white-space: nowrap;
`;

export default function ColumnHeaderControl({ column, setSort, onResize, order, setGrouping, grouping }) {
  const onResizeDown = useSplitterDrag('clientX', onResize);
  return (
    <HeaderDiv>
      <LabelDiv>
        {grouping && (
          <GroupingLabel>{grouping == 'COUNT DISTINCT' ? 'distinct' : grouping.toLowerCase()}:</GroupingLabel>
        )}

        <ColumnLabel {...column} />
        {order == 'ASC' && (
          <IconWrapper>
            <FontIcon icon="fas fa-sort-alpha-down green" />
          </IconWrapper>
        )}
        {order == 'DESC' && (
          <IconWrapper>
            <FontIcon icon="fas fa-sort-alpha-down-alt green" />
          </IconWrapper>
        )}
      </LabelDiv>
      {setSort && (
        <DropDownButton>
          <DropDownMenuItem onClick={() => setSort('ASC')}>Sort ascending</DropDownMenuItem>
          <DropDownMenuItem onClick={() => setSort('DESC')}>Sort descending</DropDownMenuItem>
          <DropDownMenuDivider />
          <DropDownMenuItem onClick={() => setGrouping('GROUP')}>Group by</DropDownMenuItem>
          <DropDownMenuItem onClick={() => setGrouping('MAX')}>MAX</DropDownMenuItem>
          <DropDownMenuItem onClick={() => setGrouping('MIN')}>MIN</DropDownMenuItem>
          <DropDownMenuItem onClick={() => setGrouping('SUM')}>SUM</DropDownMenuItem>
          <DropDownMenuItem onClick={() => setGrouping('AVG')}>AVG</DropDownMenuItem>
          <DropDownMenuItem onClick={() => setGrouping('COUNT')}>COUNT</DropDownMenuItem>
          <DropDownMenuItem onClick={() => setGrouping('COUNT DISTINCT')}>COUNT DISTINCT</DropDownMenuItem>
          {isTypeDateTime(column.dataType) && (
            <>
              <DropDownMenuDivider />
              <DropDownMenuItem onClick={() => setGrouping('GROUP:YEAR')}>Group by YEAR</DropDownMenuItem>
              <DropDownMenuItem onClick={() => setGrouping('GROUP:MONTH')}>Group by MONTH</DropDownMenuItem>
              <DropDownMenuItem onClick={() => setGrouping('GROUP:DAY')}>Group by DAY</DropDownMenuItem>
              {/* <DropDownMenuItem onClick={() => setGrouping('GROUP:HOUR')}>Group by HOUR</DropDownMenuItem>
              <DropDownMenuItem onClick={() => setGrouping('GROUP:MINUTE')}>Group by MINUTE</DropDownMenuItem> */}
            </>
          )}
        </DropDownButton>
      )}
      <ResizeHandle className="resizeHandleControl" onMouseDown={onResizeDown} />
    </HeaderDiv>
  );
}
