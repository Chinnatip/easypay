import React, { Component } from 'react';
import QrReader from 'react-qr-reader';
import router from 'umi/router';
import styled from 'styled-components';
import { Modal, Button } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
//
const alert = Modal.alert;
const Container = styled.div`
  background: #1f1f1f;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  ._title {
    font-size: 18px;
    margin-bottom: 16px;
    color: #bfbfbf;
    margin-top: -20px;
  }
  ._group {
    width: 100%;
    padding: 20px;
    .am-button {
      margin: 14px 24px 0;
      color: #383838;
      background-color: #989898;
    }
  }
`;

class Capture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: 'No result',
      modal: false,
    };
  }
  handleScan = data => {
    const { modal } = this.state;
    if (data && modal === false) {
      //console.log(data);
      this.setState({ modal: true });
      alert('ตรวจพบ QR-CODE', `ต้องการจะลิงค์ไปที่ ${data} หรือไม่?`, [
        { text: 'ยกเลิก', onPress: () => this.setState({ modal: false }) },
        {
          text: 'ตกลง',
          onPress: () => {
            window.location.href = data;
          },
        },
      ]);
    }
  };
  handleError = err => {
    console.error(err);
  };

  render() {
    return (
      <Container>
        <div className="_title">แสกนตั๋ว QR-CODE ที่นี่</div>
        <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: '100%' }}
        />
      </Container>
    );
  }
}
export default Capture;
