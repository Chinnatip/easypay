import styled from 'styled-components';
import ReactCountryFlag from 'react-country-flag';
import router from 'umi/router';

const Card = styled.div`
  display: flex;
  background: white;
  border-radius: 4px;
  padding: 10px;
  margin: 12px;
  ${'' /* min-height: 124px; */}
  box-shadow: 0 1px 5px #adadc1;
  ._main {
    flex-grow: 1;
    text-align: left;
    ._name {
      font-size: 20px;
      margin-bottom: 6px;
      font-weight: 300;
      color: #484848;
    }
    ._flag {
      font-size: 26px;
      margin-right: 9px;
      vertical-align: middle;
    }
    ._amount {
      vertical-align: middle;
      line-height: 24px;
      font-weight: 500;
      font-size: 15px;
      letter-spacing: 0.4px;
      color: #484848;
    }
  }
  ._extra {
    text-align: right;
    font-size: 14px;
    font-weight: 300;
    color: #484848;
    ._ref {
    }
    ._pnr {
      color: #137cfe;
      font-size: 20px;
      font-weight: 500;
      margin: 2px 0 3px;
    }
    ._d {
      font-size: 12px;
      span {
        color: #ff5e01;
      }
    }
  }
  ._flex {
    display: flex;
  }
`;

const Cards = props => {
  const { STATUS, PNR, RefNo, Name, Country, Adult, Children, PickUp, DropOff } = props.detail;
  return (
    <Card onClick={() => STATUS === 'pending' && router.push(`/checkin/${RefNo}`)}>
      <div className="_main">
        <div className="_name">{Name}</div>
        <div className="_flex">
          <ReactCountryFlag className="_flag" code={Country}></ReactCountryFlag>
          <div className="_amount">
            ผู้ใหญ่: {Adult} | เด็ก: {Children}
          </div>
        </div>
      </div>
      <div className="_extra">
        <div className="_ref">Ref No : {RefNo}</div>
        <div className="_pnr">PNR : {PNR}</div>
        <div className="_d">
          Pick up : <span>{PickUp}</span>
        </div>
        <div className="_d">
          Drop off : <span>{DropOff}</span>
        </div>
      </div>
    </Card>
  );
};

export default Cards;
