import React, { SFC, useState } from 'react'
import { FormikProps, Form } from 'formik'
import { InputText, InputNumber, Button } from 'components'
import { isEmpty } from 'lodash'
import './forgotPassword.style.scss'

const constants = {
  requestOTP: 'ขอ OTP',
  resetPassword: 'เปลี่ยนรหัสผ่าน',
  placeholderUsername: 'ชื่อผู้ใช้ *',
  placeholderPhoneNumber: 'เบอร์โทรศัพท์ *',
  placeholderOTP: 'หมายเลข OTP *',
  placeholderPassword: 'รหัสผ่านใหม่ *',
  placeholderConfirmPassword: 'ยืนยันรหัสผ่านใหม่ *',
  placeholderInput: (type: string) => `ระบุ${type}`.slice(0, -1),
}

const ForgotPasswordFormComponnet:
  SFC<FormikProps<IForgotPasswordForm> & IForgotPasswordFormProps> = ({
    values,
    handleBlur,
    handleChange,
    setFieldValue,
    errors,
    touched,
    isValid,
    handleOtpRequest,
  }) => {

    const [isOTPRequest, setOTPRequestState] = useState<boolean>(false)
    const [isRequted, setRequested] = useState<boolean>(false)

    const handleOTPRequest = () => {
      handleOtpRequest(values.username, values.phoneNumber)
      setOTPRequestState(true)
      setTimeout(() => {
        setRequested(true)
      }, 256)
    }

    return (
      <Form>
        <div className="row">
          <div className="col">
            <div className="border-rounded p2 secondary-bg">
              <div className="row p1-t">
                <div className="col">
                  <h6 className="subtitle-2 secondary-blue-text">{constants.placeholderUsername}</h6>
                  <InputText
                    name="username"
                    value={values.username}
                    onBlur={handleBlur}
                    disabled={isOTPRequest}
                    toLowercase
                    setFieldValue={setFieldValue}
                    errorMessage={errors.username}
                    error={!!errors.username && touched.username}
                    placeholder={constants.placeholderInput(constants.placeholderUsername)}
                  />
                </div>
              </div>
              <div className="row p1-t">
                <div className="col">
                  <h6 className="subtitle-2 secondary-blue-text">{constants.placeholderPhoneNumber}</h6>
                  <InputNumber
                    decimalScale={0}
                    name="phoneNumber"
                    format="### ### ####"
                    onBlur={handleBlur}
                    disabled={isOTPRequest}
                    allowNegative={false}
                    onValueChange={({ value }) => setFieldValue('phoneNumber', value)}
                    value={values.phoneNumber}
                    errorMessage={errors.phoneNumber}
                    placeholder={constants.placeholderPhoneNumber}
                    error={!!errors.phoneNumber && touched.phoneNumber}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row m2-t">
          <div className="col">
            <Button
              id="otp-request-button"
              disabled={!!errors.username || isEmpty(values.username)
                || !!errors.phoneNumber || isEmpty(values.phoneNumber) || isOTPRequest}
              text={constants.requestOTP}
              onClick={handleOTPRequest}
            />
          </div>
        </div>
        {
          isOTPRequest
            ? (
              <>
                <div className={`row m4-t otp-new-password ${isRequted ? 'requested' : ''}`}>
                  <div className="col">
                    <div className="border-rounded p2 secondary-bg">
                      <div className="row p1-t">
                        <div className="col">
                          <h6 className="subtitle-2 secondary-blue-text">{constants.placeholderOTP}</h6>
                          <InputText
                            name="otp"
                            value={values.otp}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            errorMessage={errors.otp}
                            error={!!errors.otp && touched.otp}
                            placeholder={constants.placeholderInput(constants.placeholderOTP)}
                          />
                        </div>
                      </div>
                      <div className="row p1-t">
                        <div className="col">
                          <h6 className="subtitle-2 secondary-blue-text">{constants.placeholderPassword}</h6>
                          <InputText
                            name="newPassword"
                            value={values.newPassword}
                            type="password"
                            onBlur={handleBlur}
                            toLowercase
                            setFieldValue={setFieldValue}
                            errorMessage={errors.newPassword}
                            error={!!errors.newPassword && touched.newPassword}
                            placeholder={constants.placeholderInput(constants.placeholderPassword)}
                          />
                        </div>
                      </div>
                      <div className="row p1-t">
                        <div className="col">
                          <h6 className="subtitle-2 secondary-blue-text">{constants.placeholderConfirmPassword}</h6>
                          <InputText
                            name="confirmNewPassword"
                            value={values.confirmNewPassword}
                            type="password"
                            onBlur={handleBlur}
                            toLowercase
                            setFieldValue={setFieldValue}
                            errorMessage={errors.confirmNewPassword}
                            error={!!errors.confirmNewPassword && touched.confirmNewPassword}
                            placeholder={constants.placeholderInput(constants.placeholderConfirmPassword)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`row m2-t otp-new-password ${isRequted ? 'requested' : ''}`}>
                  <div className="col">
                    <Button
                      id="submit-reset-password-button"
                      buttonType="submit"
                      disabled={!isValid && !!touched}
                      text={constants.resetPassword}
                    />
                  </div>
                </div>
              </>
            )
            : (<></>)
        }
      </Form>
    )
  }

export default ForgotPasswordFormComponnet