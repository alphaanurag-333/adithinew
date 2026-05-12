

function SellerChat() {
  return (
    <section className="sellerChatSection">
      <div class="row">
        <div className="col-4 p-0 ">
          <div className="sellerChatSidebar">
            <div
              class="nav flex-column nav-pills"
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
            >
              <button
                class="nav-link chatSideBtn active"
                id="v-pills-chat-sider-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-chat-sider"
                type="button"
                role="tab"
                aria-controls="v-pills-chat-sider"
                aria-selected="true"
              >
                <div className="chatProfileImg">
                  <img src={DummyImg} alt="dummy.png" />
                </div>
                Vendor ABC
              </button>
              <button
                class="nav-link chatSideBtn"
                id="v-pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-home"
                type="button"
                role="tab"
                aria-controls="v-pills-home"
                aria-selected="true"
              >
                <div className="chatProfileImg">
                  <img src={DummyImg} alt="dummy.png" />
                </div>
                Vendor ABC
              </button>
              <button
                class="nav-link chatSideBtn"
                id="v-pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-home"
                type="button"
                role="tab"
                aria-controls="v-pills-home"
                aria-selected="true"
              >
                <div className="chatProfileImg">
                  <img src={DummyImg} alt="dummy.png" />
                </div>
                Vendor ABC
              </button>
              <button
                class="nav-link chatSideBtn"
                id="v-pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-home"
                type="button"
                role="tab"
                aria-controls="v-pills-home"
                aria-selected="true"
              >
                <div className="chatProfileImg">
                  <img src={DummyImg} alt="dummy.png" />
                </div>
                Vendor ABC
              </button>
              <button
                class="nav-link chatSideBtn"
                id="v-pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-home"
                type="button"
                role="tab"
                aria-controls="v-pills-home"
                aria-selected="true"
              >
                <div className="chatProfileImg">
                  <img src={DummyImg} alt="dummy.png" />
                </div>
                Vendor ABC
              </button>
            </div>
          </div>
        </div>
        <div className="col-8 p-0 customTabBorder">
          <div className="sellerChatContent">
            <div class="tab-content" id="v-pills-tabContent">
              <div
                class="tab-pane fade show active"
                id="v-pills-chat-sider"
                role="tabpanel"
                aria-labelledby="v-pills-chat-sider-tab"
                tabIndex="0"
              >
                <div className="chatHeader">
                  <div className="chatHeaderProfileDiv">
                    <img src={DummyImg} alt="dummy.png" />
                  </div>
                  <p className="sellerChatName">Vendor ABC</p>
                </div>
                <div className="chatSectionDiv">
                  <div className="chatArea">
                    <div className="receiveMsgDiv">
                      <h6 className="receiveMsg">Hey there! 👋</h6>
                      <p className="receiveMsgTime">10:10</p>
                    </div>
                    <div className="receiveMsgDiv">
                      <h6 className="receiveMsg">
                        This is your delivery driver from Speedy Chow. I'm just around the corner
                        from your place. 😊
                      </h6>
                      <p className="receiveMsgTime">10:10</p>
                    </div>
                    <div className="sendMsgDiv">
                      <h6 className="sendMsg">Hii</h6>
                      <p className="sendMsgTime">10:10</p>
                    </div>
                    <div className="sendMsgDiv">
                      <h6 className="sendMsg">
                        Awesome, thanks for letting me know ! <br /> Can't wait for my delivery. 🎉
                      </h6>
                      <p className="sendMsgTime">10:11</p>
                    </div>
                    <div className="receiveMsgDiv">
                      <h6 className="receiveMsg">
                        No problem at all! I'll be there in about 15 minutes.
                      </h6>
                      <p className="receiveMsgTime">10:11</p>
                    </div>
                    <div className="sendMsgDiv">
                      <h6 className="sendMsg">Great! 😊</h6>
                      <p className="sendMsgTime">10:12</p>
                    </div>
                  </div>
                  <div className="chatInputBar">
                    <input className="chatInput" type="text" placeholder="Ask anything..." />
                    <img src={SentImg} alt="sent.png" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SellerChat
