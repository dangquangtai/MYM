import React from 'react';
import * as Icons from '@material-ui/icons';
import SvgIcon from '@material-ui/core/SvgIcon';

const CustomIcon = ({ type, name, svg, className }) => {
  const IconComponent = Icons[name];

  if (type === 'BASE64' && svg) {
    return (
      <SvgIcon className={className}>
        <g dangerouslySetInnerHTML={{ __html: svg }} />
      </SvgIcon>
    );
    // return <img src={svg} alt={name} className={className}/>;
  }

  if (!name || !IconComponent) {
    return <Icons.FolderOpen className={className} />;
  }

  return <IconComponent className={className} />;
};

export default CustomIcon;
