import { Component, h, Method } from '@stencil/core';
import { Session } from '../../models/session';

@Component({
  tag: 'tsc-app-layout',
  styleUrl: 'app-layout.css',
  shadow: true,
})
export class AppLayout {
  @Method()
  async getSession():Promise<Session> {
    return Session._instance;
  }

  render() {
    return <div class="outer-layout">
        <div class="nav-bar">

        </div>
        <div class="keyboard-tool"></div>
        <div class="panel-container">
            <div class="panel-container-inner">
                <slot></slot>
            </div>
        </div>
        <div class="pinned-bottom">
            <slot name="slot-pinned-bottom"></slot>
        </div>
    </div>
  }
}
