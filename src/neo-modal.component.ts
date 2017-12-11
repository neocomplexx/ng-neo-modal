/* tslint:disable:no-bitwise */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import {NgbModal, NgbModalOptions, NgbActiveModal,  ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit, AfterViewInit, OnChanges, ApplicationRef, ChangeDetectorRef, ViewChild } from '@angular/core';
import * as _ from 'lodash';

@Component({
  templateUrl: './neo-modal.component.html',
  styleUrls: ['./neo-modal.component.scss']
})

export class NeoModalComponent implements OnInit, AfterViewInit, OnChanges {
  // Default config
  public config = {
    title: {
      visibility: true,
      text: 'This is a title'
    },
    message: 'This is a message',
    type: null,
    input: {
      visibility: false,
      placeholder: 'Ingrese su texto aquí',
      value: null
    },
    button: {
    yes: {
      visibility: false,
      autofocus: false,
      text: 'Si'
    },
    no: {
      visibility: false,
      autofocus: false,
      text: 'No'
    },
    retry: {
      visibility: false,
      autofocus: false,
      text: 'Retry'
    },
    cancel: {
      visibility: true,
      autofocus: false,
      text: 'Cancelar'
    },
    accept: {
      visibility: true,
      autofocus: true,
      text: 'Aceptar'
    },
  }
}
@ViewChild('buttons') btn: any;

  constructor(public activeModal: NgbActiveModal, public changeRef: ChangeDetectorRef) {
    console.log('Construct NeoModalComponent');
  }

  ngOnChanges() {
    console.log('OnChanges');
  }

  ngAfterViewInit() {
    const foc: string = this.getButtonFocus();

    // Find element in DOM and focus.
    if (foc) {
      const buttons = this.btn.nativeElement.children;
      let noEncontre: boolean = true;
      for (let i = 0; (i < buttons.length) && noEncontre; i++) {
        if (buttons[i].innerText === this.config.button[foc].text) {
          noEncontre = false;
          buttons[i].focus();
        }
      }

    }

 }
  ngOnInit() {
    console.log('OnInit');
  }

  private getButtonFocus(): string {

    const resu = _.findKey(this.config.button, function(val){
      return (val.visibility && val.autofocus);
    })


    return resu;
  }

  public informResult(res: string) {
    const button: AlertButton = AlertButton[res];
    const respuesta: AlertResult = new AlertResult(button, this.config.input.value);

    this.activeModal.close(respuesta);
    this.activeModal.dismiss(respuesta);
  }
}



  export class AlertResult {

    constructor(public ButtonResponse: AlertButton, public messageInput: string) {
    }
  }

  export enum AlertButton {
    None = 0,
    Accept = 1 << 0,
    Cancel = 1 << 1,
    Yes = 1 << 2,
    No = 1 << 3,
    Retry = 1 << 4
  }
