import { Button, ColorCircle, ColorOption, ColorPicker, Popover } from '@ims/component-library'
import React, { useEffect, useState } from 'react'
import styles from './colorpicker.module.css';
import FormatColorResetRoundedIcon from '@mui/icons-material/FormatColorResetRounded';
interface ColorPickerProps {
    colors: string[];
    onClick?: Function;
    getSelectedColor?: Function;
    getSelectedColorDark?: Function;
}

export default function ColorPickerModal(props: ColorPickerProps) {

    const [selectedColor, setSelectedColor] = useState("#cccccc");
    const [selectedColorDark, setSelectedColorDark] = useState("#595959");

    useEffect(() => {
        if (props.getSelectedColor) {
            props.getSelectedColor(selectedColor);
        }
        if (props.getSelectedColorDark) {
            props.getSelectedColorDark(selectedColorDark);
        }
    }, [selectedColor, selectedColorDark])

    const getSelectedColorPicker = (selectedColor: { hex: React.SetStateAction<string>; }) => {
        setSelectedColor(selectedColor.hex);
    }
    const getSelectedColorPickerDark = (selectedColorDark: { hex: React.SetStateAction<string>; }) => {
        console.log("aaaaaaa", selectedColorDark)
        setSelectedColorDark(selectedColorDark.hex);
    }
    return (
        <div style={{ marginLeft: '30px' }}>
            <h3>Colors</h3>
            <div className={styles.container} >
                {
                    props?.colors?.map((color: string) => {
                        return (
                            <div key={color} className={styles.circle} onClick={() => setSelectedColor(color)}>
                                <ColorCircle color={color} size='20px' />
                                <br></br>
                            </div>
                        )
                    })
                }
            </div>
            <Popover elementLabel='Customize' elementColor='inherit'>
                <div className={styles.colorPickers}>
                    <ColorPicker optionLabel='Option1' labelType='light' getSelectedValue={getSelectedColorPicker} />
                    <ColorPicker optionLabel='Option2' labelType='dark' getSelectedValue={getSelectedColorPickerDark} />
                </div>
            </Popover>
            <Button className={styles.resetBtn} label='reset' color='error' onClick={() => setSelectedColor("#cccccc")} icon={<FormatColorResetRoundedIcon />} />
            <div className={styles.footer}>
                <label>Preview:</label>
                <ColorOption color={selectedColor} label='option1' labelType='light' size='20px' />
            </div>
        </div>
    )
}
