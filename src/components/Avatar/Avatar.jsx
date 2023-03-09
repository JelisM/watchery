import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'antd';
import defaultAvatar from '../assets/defaultAvatar.png';
import { AvatarIcon } from './Components.styled';

function Avatar({ imgSrc, size, bordered, displayName }) {
  const [url, setUrl] = useState(imgSrc || defaultAvatar);

  useEffect(() => {
    setUrl(imgSrc || defaultAvatar);
  }, [imgSrc]);

  return (
    <Tooltip title={displayName} color="blue" placement="bottom">
      <AvatarIcon
        data-testid="avatar-icon"
        size={size}
        src={url}
        bordered={bordered}
        onError={() => setUrl(defaultAvatar)}
      />
    </Tooltip>
  );
}

Avatar.propTypes = {
  imgSrc: PropTypes.string,
  size: PropTypes.number,
  bordered: PropTypes.bool,
  displayName: PropTypes.string,
};

Avatar.defaultProps = {
  size: 32,
  bordered: false,
  displayName: '',
};

export default Avatar;
