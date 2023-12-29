import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        padding: 10,
        // backgroundColor: 'green',
    },
    openCloseButton: {
        textAlign: 'center'
    },
    searchButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        backgroundColor: '#0000ff',
        borderRadius: 8,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchButtonText: {
        color: 'white',
        fontWeight: 'bold'
    },
    contentSearchInput: {
        // backgroundColor: 'red',
        paddingBottom: 10
    },
    searchInput: {
        width: '100%',
        fontWeight: '400',
        fontSize: 16,
        color: '#5f6367',
        padding: 12,
        marginVertical: 10,
        borderRadius: 6,
        borderWidth: 0.3,
        borderColor: '#9f9f9f',
        backgroundColor: '#f1f1f1'
    },
    itemList: {
        borderBottomWidth: 0.3,
        borderBottomColor: '#898f94',
        padding: 8
    },
    textListDireccion: {
        textAlign: 'rigth', 
        fontWeight: '500'
    },
    textListNombreEspecialidad: {
        color: '#5f6367',
        marginTop: 1
    }
});

export default styles;
