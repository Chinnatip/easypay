import styled from 'styled-components';

const Li = styled.div`
  display: inline-block;
  width: 100%;
  background-color: white;
  height: 52px;
  text-align: left;
  line-height: 52px;
  border-bottom: 1px solid #d8d8d8;
  font-size: 16px;
  &._pnr {
    color: #137cfe;
    font-size: 20px;
    font-weight: 600;
    .list_title {
      color: #137cfe;
      font-weight: 600;
      margin-right: 10px;
    }
    .list_desc {
      color: #137cfe;
    }
  }
  &._orange {
    .list_desc {
      color: #ff5e01;
    }
  }

  .flex {
    display: flex;
  }
  .list_title {
    color: grey;
    margin-right: 10px;
    font-weight: 500;
    padding: 0 0 0 1.5em;
  }
  .list_desc {
    color: #2d2d2d;
  }
`;

const List = props => {
  const { theme, title, desc, flex } = props;
  if (theme === 'location') {
    return (
      <Li className="_orange" style={flex ? { borderLeft: '1px solid #D8D8D8' } : {}}>
        <span className="list_title">{title}</span>
        <span className="list_desc">{desc}</span>
      </Li>
    );
  } else if (theme === 'pnr') {
    return (
      <Li className="_pnr" style={flex ? { borderLeft: '1px solid #D8D8D8' } : {}}>
        <span className="list_title">{title}</span>
        <span className="list_desc">{desc}</span>
      </Li>
    );
  } else {
    return (
      <Li style={flex ? { borderLeft: '1px solid #D8D8D8' } : {}}>
        <span className="list_title">{title}</span>
        <span className="list_desc">{desc}</span>
      </Li>
    );
  }
};

export default List;
