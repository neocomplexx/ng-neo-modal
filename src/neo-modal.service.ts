import { Injectable } from '@angular/core';
import { NeoModalComponent, AlertResult, AlertButton } from './neo-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';

@Injectable()
export class NeoModalService {
  template: any;

  public originalAlert: any;

  constructor(private modalService: NgbModal) {
    const that: NeoModalService = this;

    this.originalAlert = window.alert;
    window.alert = async function(msg) {
      await that.alert(msg);
    }
  }

  private async openModal(config: any): Promise<any> {
    const modalRef = this.modalService.open(NeoModalComponent, {
      backdrop : 'static',
      keyboard : false,
      windowClass : 'neoWindow'
    });

    modalRef.componentInstance = _.merge(modalRef.componentInstance.config, config);
    modalRef.componentInstance.changeRef.markForCheck();

    return await modalRef.result;
  }


   /**
   *
   * Show message. Can be use as window.alert
   * @param {string} msg Mensaje a mostrar
   * @returns {Promise<void>}
   * @memberof AlertService
   */
  public async alert(msg: string): Promise<void> {

    const config = {
      title: {
        visibility: false
      },
      message: msg,
      button: {
        cancel: {
          visibility: false
        }
      }
    }
    await this.openModal(config);
  }

  /**
   *
   * Show succsessfull  message
   * @param {string} msg Message
   * @returns {Promise<AlertResult>}
   * @memberof AlertService
   */
  public async success(msg: string): Promise<AlertResult> {
    const config = {
      title: {
        text: 'Buen trabajo!'
      },
      message: msg,
      type: 'success',
      button: {
        cancel: {
          visibility: false
        }
      }
    }
    return this.openModal(config);
  }

   /**
   *
   * Warning message
   * @param {string} msg Message
   * @returns {Promise<AlertResult>}
   * @memberof AlertService
   */
  public async warning(msg: string): Promise<AlertResult> {
    const config = {
      title: {
        text: 'Cuidado!'
      },
      message: msg,
      type: 'warning',
      button: {
        cancel: {
          visibility: false
        }
      }
    }

    return this.openModal(config);
  }

    /**
   *
   * Error message
   * @param {string} msg Message
   * @returns {Promise<AlertResult>}
   * @memberof AlertService
   */
  public async error(msg: string): Promise<AlertResult> {
    const config = {
      title: {
        text: 'Error!'
      },
      message: msg,
      type: 'error',
      button: {
        cancel: {
          visibility: false
        }
      }
    }
    return this.openModal(config);
  }

  /**
   *
   * Information message
   * @param {string} msg Message
   * @returns {Promise<AlertResult>}
   * @memberof AlertService
   */
  public async info(msg: string): Promise<AlertResult> {
    const config = {
      title: {
        text: 'Información importante!'
      },
      message: msg,
      type: 'info',
      button: {
        cancel: {
          visibility: false
        }
      }
    }
    return this.openModal(config);
  }

  /**
   *
   * Show decission modal with question and two options for accept or reject.
   * @param {string} questionMsg Info message
   * @param {string} successMsg Message if accept
   * @param {string} cancelMsg Message if reject
   * @returns {Promise<AlertResult>} Promise based in user choise
   * @memberof AlertService
   */
  public async decision(questionMsg: string, successMsg: string, cancelMsg: string): Promise<AlertResult> {

    const config = {
      title: {
        text: 'Estas seguro?'
      },
      message: questionMsg,
      type: 'question'
    }
    const that: NeoModalService = this;

    return this.openModal(config)
    .then( (value) => {
      if (value.ButtonResponse === AlertButton.Accept)  {
        if (successMsg !== '') {
          that.success(successMsg);
        }
      }else {
        that.info(cancelMsg);
      }
      return Promise.resolve(value);
    })

  }

  /**
   *
   * Input text message
   * @param {string} msg Message to user
   * @param {string} placeholder Input placeholder
   * @param {string} successMsg Succes message, if null will show nothing
   * @returns {Promise<AlertResult>} Promise with user input
   * @memberof AlertService
   */
  public async input(title: string, placeholder: string, successMsg: string): Promise<AlertResult> {
    const config = {
      title: {
        text: title
      },
      message: '',
      input: {
        placeholder,
        visibility: true
      }
    }
    const that: NeoModalService = this;

   return this.openModal(config)
     .then((value) => {
      if (value.ButtonResponse === AlertButton.Accept)  {
        if (successMsg) {
          that.success(successMsg);
        }
      }
      return Promise.resolve(value);
    })



  }

  public async yesNoCancel(title: string, message: string, buttonFocus: AlertButton): Promise<AlertResult> {

     return this.custom(title, message, (AlertButton.Yes | AlertButton.No | AlertButton.Cancel), AlertButton.No);
   }

   private async custom(title: string, message: string, buttons: AlertButton, buttonFocus: AlertButton): Promise<AlertResult> {
    const buttonAccept: boolean = (buttons & AlertButton.Accept) > 0;
    const buttonYes: boolean = (buttons & AlertButton.Yes) > 0;
    const buttonCancel: boolean = (buttons & AlertButton.Cancel) > 0;
    const buttonNo: boolean = (buttons & AlertButton.No) > 0;
    const buttonRetry: boolean = (buttons & AlertButton.Retry) > 0;

    const buttonAcceptFocus: boolean = buttonFocus === AlertButton.Accept;
    const buttonYesFocus: boolean = buttonFocus === AlertButton.Yes;
    const buttonCancelFocus: boolean = buttonFocus === AlertButton.Cancel;
    const buttonNoFocus: boolean = buttonFocus === AlertButton.No;
    const buttonRetryFocus: boolean = buttonFocus === AlertButton.Retry;

    const config = {
      title: {
        text: title
      },
      message,
      button: {
        yes: {
          visibility: buttonYes,
          autofocus: buttonYesFocus
        },
        no: {
          visibility: buttonNo,
          autofocus: buttonNoFocus
        },
        retry: {
          visibility: buttonRetry,
          autofocus: buttonRetryFocus
        },
        cancel: {
          visibility: buttonCancel,
          autofocus: buttonCancelFocus
        },
        accept: {
          visibility: buttonAccept,
          autofocus: buttonAcceptFocus
        }
      }
    }


    return this.openModal(config);
   }



}
