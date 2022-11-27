import { Component, Prop, h } from '@stencil/core';

@Component({
    tag: 'tsc-app-layout-panel',
    styleUrl: 'app-layout-panel.css',
    shadow: true,
})
export class AppLayoutPanel {
    @Prop() title: string;
    render() {
        return <div class="panel-container">

            <div class="control-area">
                <span>{this.title}</span>
            </div>

            <div class="content-area">
                <slot></slot>
            </div>
        </div>
    }
}
