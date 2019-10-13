import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import 'antd-mobile/dist/antd-mobile.css';
import enUS from 'antd-mobile/lib/locale-provider/en_US';
import { NavBar, LocaleProvider, Modal, Button, InputItem, WhiteSpace, List } from 'antd-mobile';
import { createForm } from 'rc-form';
import generatePayload from 'promptpay-qr';
import THAIQR from '../assets/thaiqr_logo.jpg';
import store from 'store';

//
const QRCode = require('qrcode.react');
const alert = Modal.alert;
const QrContainers = styled.div`
  display: inline-block;
  background: white;
  width: fit-content;
  margin: auto;
  padding: 16px;
`;
const Navbar = styled.div`
  margin-top: -1px;
  ._logo {
    height: 20px;
    margin-right: 6px;
  }
  .am-navbar {
    background: #193663 !important;
    color: white !important;
    letter-spacing: 0.5px;
    font-weight: 600;
  }
  .am-navbar-title {
    color: white;
  }
`;
const Footer = styled.div`
  position: fixed;
  height: 8px;
  background: #193663;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 4;
`;

// Money input
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let moneyKeyboardWrapProps;
if (isIPhone) {
  moneyKeyboardWrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valid: false,
      token: '',
      identity: '',
      telephone: '',
      amount: 20,
    };
  }
  componentDidMount() {
    const identity = store.get('identity') !== undefined ? store.get('identity') : '';
    const telephone = store.get('telephone') !== undefined ? store.get('telephone') : '';
    this.setState({ identity: identity, telephone: telephone });
  }
  submit = () => {
    this.setState({
      valid: false,
    });
    const { valid, token } = this.state;
    this.props.form.validateFields((error, value) => {
      if (error === null) {
        //
        const { identity_code, telephone, amount, notes } = value;
        //
        if ((identity_code === '' && telephone === '') || amount === '') {
          let problem;
          if (identity_code === '' && telephone === '') {
            problem = 'กรอกบัตรประชาชน หรือเบอร์มือถือ';
          } else if (amount === '') {
            problem = 'กรอกจำนวนเงิน';
          }
          alert('กรุณากรอกข้อมูลให้ครบถ้วน', <div>{problem}</div>, [
            { text: 'แก้ไข', onPress: () => console.log('OK') },
          ]);
        } else {
          if (identity_code !== '' && telephone !== '') {
            alert(
              'กรุณากรอกข้อมูลให้ครบถ้วน',
              <div>เลือกกรอก เบอร์โทร หรือ เลขบัตรประชาชน เเค่อย่างเดียว</div>,
              [{ text: 'แก้ไข', onPress: () => console.log('OK') }],
            );
          } else {
            //
            const amount = parseFloat(value.amount);
            const identifier = identity_code !== '' ? identity_code : telephone;
            const identifier_check =
              identity_code !== ''
                ? { check: identifier.length === 16, type: 'identity' }
                : { check: telephone.length === 12, type: 'telephone' };
            const amount_check = amount > 1;
            //
            if (identifier_check.check && amount_check) {
              const payload = generatePayload(identifier, { amount });
              this.setState({
                valid: true,
                token: payload,
              });

              alert(
                'แสกน QR CODE เพื่อจ่ายเงิน',
                <QrContainers>
                  <QRCode size={180} value={token} />
                </QrContainers>,
                [
                  {
                    text: 'เซฟลิสต์ +',
                    onPress: () => console.log('Save this code to local-storage', amount, notes),
                  },
                  { text: 'ปิดหน้าจอ' },
                ],
              );

              if (identifier_check.type === 'telephone') {
                store.set('telephone', identifier);
                store.set('identity', '');
              } else if (identifier_check.type === 'identity') {
                store.set('identity', identifier);
                store.set('telephone', '');
              }
            } else {
              if (!amount_check) {
                alert('กรุณากรอกข้อมูลให้ครบถ้วน', <div>จำนวนเงินต้องมากกว่า 1 บาท</div>, [
                  { text: 'แก้ไข' },
                ]);
              } else {
                const problem =
                  identifier_check.type === 'identity'
                    ? 'เลขบัตรประชาชนต้องมี 13 หลัก'
                    : identifier_check.type === 'telephone'
                    ? 'เบอร์มือถือต้องมี 10 หลัก'
                    : 'Some error occurred.';
                alert('กรุณากรอกข้อมูลให้ครบถ้วน', <div>{problem}</div>, [{ text: 'แก้ไข' }]);
              }
            }
          }
        }
      } else {
        alert(error);
      }
    });
  };
  render() {
    const { getFieldProps } = this.props.form;
    const { valid, token, identity, telephone, amount } = this.state;
    return (
      <Fragment>
        <Navbar>
          <NavBar mode="light">
            <img className="_logo" src={THAIQR} /> EASYPay
          </NavBar>
        </Navbar>

        <WhiteSpace />
        <List renderHeader={() => 'เลขบัญชีที่เชื่อมกับ Prompt Pay'}>
          <InputItem
            {...getFieldProps('telephone', { initialValue: telephone })}
            type="phone"
            maxLength="12"
            placeholder="YYY YYYY YYY"
          >
            เบอร์มือถือ
          </InputItem>
          <InputItem
            {...getFieldProps('identity_code', { initialValue: identity })}
            placeholder="XXXX XXXX XXXX X"
            type="bankCard"
            maxLength="16"
          >
            บัตรประชาชน
          </InputItem>
        </List>

        <WhiteSpace />
        <List renderHeader={() => 'รายละเอียดสินค้า'}>
          <LocaleProvider locale={enUS}>
            <InputItem
              {...getFieldProps('amount', { initialValue: amount })}
              type="money"
              locale={enUS}
              clear
              placeholder="0.00"
              extra="บาท"
              moneyKeyboardAlign="left"
              moneyKeyboardWrapProps={moneyKeyboardWrapProps}
            >
              จำนวนเงิน
            </InputItem>
          </LocaleProvider>

          <InputItem
            {...getFieldProps('notes', { initialValue: '' })}
            maxLength="120"
            clear
            placeholder="ไม่เกิน 120 ตัวอักษร"
          >
            โน้ตรายการ
          </InputItem>
        </List>

        {/*  */}
        <div style={{ padding: '0 15px' }}>
          <br />
          <Button type="primary" onClick={this.submit}>
            สร้าง QR CODE
          </Button>
        </div>

        <Footer />
      </Fragment>
    );
  }
}
export default createForm()(Index);
