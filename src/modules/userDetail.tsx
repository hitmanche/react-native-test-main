import React from 'react';
import {
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { slowFunction } from '../global/helper';
import { IUser } from '../models/apiModels';


const UserComponent: React.FC<{ user: IUser; onClick: any }> = ({
    user,
    onClick,
}) => {
    console.log(`Start slow function ${user.name}`);

    const slowResult = slowFunction(user.name);
    //const slowResult = 'empty';
    console.log(`Render ${user.name}`);

    return (
        <View style={{ marginLeft: 20, marginTop: 20 }}>
            <TouchableOpacity onPress={() => onClick(user)}>
                <Text style={{ fontWeight: 'bold' }}>
                    {user.id}. {user.name}
                </Text>
                <Text>Email: {user.email} </Text>
                <Text style={{ color: 'green' }}>Slow Result: {slowResult} </Text>
            </TouchableOpacity>
        </View>
    );
};

const arePropsEqual = (prevProps: any, nextProps: any) => {
    console.log(nextProps, prevProps)
    return nextProps?.user?.id === prevProps?.user?.id
}

export default React.memo(UserComponent, arePropsEqual);