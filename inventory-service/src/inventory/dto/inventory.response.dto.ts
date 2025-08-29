export const createInventoryResponse = {
    "data": {
        "type": "inventories",
        "id": "5",
        "attributes": {
            "producto_id": 3,
            "cantidad": 10
        }
    }
}

export const getInventoryProductResponse = {
    "data": {
        "type": "inventories",
        "attributes": {
            "producto": {
                "nombre": "Teclado Mecánico Keychron K2",
                "precio": "420.00"
            },
            "cantidad": 10
        }
    }
}

export const updateInventoryResponse = {
    "data": {
        "type": "inventories",
        "id": "8",
        "attributes": {
            "producto_id": 4,
            "cantidad": 0
        }
    }
}