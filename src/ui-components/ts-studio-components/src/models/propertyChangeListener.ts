export interface PropertyChangeListener{
    onPropertyChange(source:any, property: string, flags: string[] | undefined)
}