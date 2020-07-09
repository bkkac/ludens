import React, { Component } from 'react'
import { ALink } from 'components'
import { noop } from 'lodash'
import colors from 'constants/colors'
import { RouteComponentProps } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faDice, faLink, faCopy } from '@fortawesome/free-solid-svg-icons'
import { number } from 'utils'
import './affilate.style.scss'

const constants = {
   back: 'ย้อนกลับ',
   totalIncome: 'รายได้ทั้งหมด',
   totalMember: 'สมาชิกที่แนะนำได้',
   howTo: 'วิธีรับคำแนะนำ',
   percent: 'เปอร์เซ็นส่วนแบ่ง',
   divider: 'ส่วนแบ่ง',
   income: 'รายได้',
   recommendedLink: 'ลิ้งแนะนำ',
   member: 'สมาชิก',
   totalMaked: 'จำนวนแทงทั้งหมด',
}

class AffilateContainer extends
   Component<RouteComponentProps> {

   onPressBack = () => this.props.history.goBack()

   onPressQAAffilate = () => this.props.history.push('/qa')

   onPressCopy = () => { noop() }

   render() {
      const totalIncome = '0.00'
      const totalMember = '0'

      const affiName = 'หวยออนไลน์'
      const affiDivider = '0.8'
      const dividerPercent = `${constants.divider} ${affiDivider}%`
      const income = '40.00'
      const affiIncome = number.castToMoney(Number(income))

      const link = 'www.thailandbet.com/afflilate/biwswalker/32423kj42kl34j2k3l4jl32kj42kl34jl2k3j4'

      const memberName = 'biwswalker'
      const createdAt = '10 พ.ค. 63'
      const memberAt = `${constants.member} ${createdAt}`
      const totalMaked = '400.00'
      const totalMakedMoney = number.castToMoney(Number(totalMaked))

      return (
         <div className="affilate-container">
            <div className="container">
               <div className="row">
                  <div className="col">
                     <ALink color="#dd3d45" bold onClick={this.onPressBack}>
                        <FontAwesomeIcon icon={faChevronLeft} className="mr-1" />
                        {constants.back}
                     </ALink>
                  </div>
               </div>
               <div className="row m3-t">
                  <div className="col text-center">
                     <h2 className="secondary-blue-text">{totalIncome}</h2>
                     <h4 className="m1-t">{constants.totalIncome}</h4>
                  </div>
                  <div className="col text-center">
                     <h2 className="secondary-blue-text">{totalMember}</h2>
                     <h4 className="m1-t">{constants.totalIncome}</h4>
                  </div>
               </div>
               <div className="row  m4-t">
                  <div className="col text-center">
                     <ALink color={colors.PRIMARY_BLUE} onClick={this.onPressQAAffilate}>
                        {constants.howTo}
                     </ALink>
                  </div>
               </div>
               <div className="row  m2-t">
                  <div className="col">
                     <div className="border-rounded secondary-bg p2">
                        <h3>{constants.percent}</h3>
                        <div className="m3-t d-flex flex-row align-items-center">
                           <FontAwesomeIcon icon={faDice} className="secondary-text m1-r" />
                           <div className="p1-x flex">
                              <h5>{affiName}</h5>
                              <div className="subtitle-2 secondary-text">{dividerPercent}</div>
                           </div>
                           <div>
                              <div className="subtitle-2 secondary-text">{constants.income}</div>
                              <h4 className="primary-green-text">{affiIncome}</h4>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="row  m2-t">
                  <div className="col">
                     <div className="border-rounded secondary-bg p2">
                        <h3>{constants.recommendedLink}</h3>
                        <div className="m3-t d-flex flex-row align-items-center">
                           <FontAwesomeIcon icon={faLink} className="secondary-text m1-r" />
                           <div className="p1-x flex overflow-hidden">
                              <div className="d-block text-truncate">
                                 <div className="subtitle-1 primary-text">{link}</div>
                              </div>
                           </div>
                           <div className="copy-button-container" onClick={this.onPressCopy}>
                              <FontAwesomeIcon icon={faCopy} className="primary-text" />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="row  m2-t">
                  <div className="col">
                     <div className="border-rounded secondary-bg p2">
                        <h3>{constants.member}</h3>
                        <div className="m3-t d-flex flex-row align-items-center">
                           <div className="flex">
                              <h5>{memberName}</h5>
                              <div className="subtitle-2 secondary-text">{memberAt}</div>
                           </div>
                           <div className="text-right">
                              <div className="subtitle-2 secondary-text">{constants.totalMaked}</div>
                              <h4>{totalMakedMoney}</h4>
                           </div>
                           <div className="p2-l">
                              <FontAwesomeIcon icon={faChevronRight} className="primary-blue-text" />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}

export default AffilateContainer