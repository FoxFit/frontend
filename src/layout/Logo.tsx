import * as React from 'react';
import { SVGProps } from 'react';
import { useTheme } from '@mui/material/styles';

const Logo = (props: SVGProps<SVGSVGElement>) => {
    const theme = useTheme();
    return (
        <b>FoxFit</b>
    );
};

export default Logo;
