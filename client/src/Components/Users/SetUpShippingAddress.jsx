import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    addShippingAddress,
    fetchShippingAddress,
    updateShippingAddress,
    deleteShippingAddress,
} from '../../features/shippingAddress/shippingAddressSlice';
import { toast } from 'react-toastify';
import axios from 'axios';

const SetUpShippingAddress = () => {
    const shippingAddress = useSelector((state) => state.shippingAddress.items) || [];
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');

    const [formData, setFormData] = useState({
        addressLine: '',
        region: '',
        province: '',
        municipal: '',
        barangay: '',
        postalCode: '',
    });

    const [regionCode, setRegionCode] = useState('');
    const [provinceCode, setProvinceCode] = useState('');
    const [municipalCode, setMunicipalCode] = useState('');

    const [regions, setRegions] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [municipals, setMunicipals] = useState([]);
    const [barangays, setBarangays] = useState([]);

    useEffect(() => {
        if (token) {
            dispatch(fetchShippingAddress());
        }
    }, [token, dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEdit = (address) => {
        setFormData({
            _id: address._id,
            addressLine: address.addressLine,
            region: address.region,
            province: address.province,
            municipal: address.municipal,
            barangay: address.barangay,
            postalCode: address.postalCode,
        });
    };

    const handleNewShippingAddress = () => {
        setFormData({
            addressLine: '',
            region: '',
            province: '',
            municipal: '',
            barangay: '',
            postalCode: '',
        });
        setRegionCode('');
        setProvinceCode('');
        setMunicipalCode('');
        setProvinces([]);
        setMunicipals([]);
        setBarangays([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData._id) {
                await dispatch(updateShippingAddress({ id: formData._id, data: formData })).unwrap();
            } else {
                await dispatch(addShippingAddress(formData)).unwrap();
            }
            await dispatch(fetchShippingAddress()).unwrap();
            handleNewShippingAddress();
        } catch (err) {
            toast.error(err || 'An error occurred');
        }
    };

    // Load regions
    useEffect(() => {
        axios
            .get('https://psgc.gitlab.io/api/regions/')
            .then((res) => setRegions(res.data))
            .catch((err) => console.error('Failed to load regions:', err));
    }, []);

    useEffect(() => {
        if (!regionCode) return;
        axios
            .get(`https://psgc.gitlab.io/api/regions/${regionCode}/provinces`)
            .then((res) => setProvinces(res.data))
            .catch((err) => console.error('Failed to load provinces:', err));
    }, [regionCode]);

    useEffect(() => {
        if (!provinceCode) return;
        axios
            .get(`https://psgc.gitlab.io/api/provinces/${provinceCode}/municipalities`)
            .then((res) => setMunicipals(res.data))
            .catch((err) => console.error('Failed to load municipals:', err));
    }, [provinceCode]);

    useEffect(() => {
        if (!municipalCode) return;
        axios
            .get(`https://psgc.gitlab.io/api/municipalities/${municipalCode}/barangays`)
            .then((res) => setBarangays(res.data))
            .catch((err) => console.error('Failed to load barangays:', err));
    }, [municipalCode]);

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Manage Shipping Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* LEFT: Saved Addresses */}
                <div className="bg-gray-50 p-2 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-4">Saved Shipping Address</h3>
                    {shippingAddress.length === 0 ? (
                        <p className="text-gray-500">No Shipping Address yet.</p>
                    ) : (
                        <ul className="space-y-4">
                            {shippingAddress.map((method) => (
                                <li key={method._id} className="p-2 border rounded-lg flex gap-4 items-center">
                                    <div>
                                        <p className="font-medium">{method.addressLine}</p>
                                        <p className="text-sm text-gray-600">
                                            {method.barangay}, {method.municipal}, {method.province}, {method.region} - {method.postalCode}
                                        </p>
                                    </div>
                                    <button
                                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-500"
                                        onClick={() => handleEdit(method)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-500"
                                        onClick={() => {
                                            if (window.confirm('Are you sure you want to delete this address?')) {
                                                dispatch(deleteShippingAddress(method._id));
                                            }
                                        }}
                                    >
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}

                    <button
                        className="mt-4 w-full py-2 bg-green-700 text-white rounded hover:bg-green-600"
                        onClick={handleNewShippingAddress}
                    >
                        + Add Shipping Address
                    </button>
                </div>

                {/* RIGHT: Address Form */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-4">Shipping Address Details</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Dropdowns */}
                        <div className="space-y-2">
                            <select
                                value={regionCode}
                                required
                                onChange={(e) => {
                                    const code = e.target.value;
                                    const region = regions.find((r) => r.code === code);
                                    setRegionCode(code);
                                    setProvinces([]);
                                    setMunicipals([]);
                                    setBarangays([]);
                                    setFormData((prev) => ({
                                        ...prev,
                                        region: region?.name || '',
                                        province: '',
                                        municipal: '',
                                        barangay: '',
                                    }));
                                }}
                            >
                                <option value="">Select Region</option>
                                {regions.map((r) => (
                                    <option key={r.code} value={r.code}>
                                        {r.name}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={provinceCode}
                                required
                                onChange={(e) => {
                                    const code = e.target.value;
                                    const province = provinces.find((p) => p.code === code);
                                    setProvinceCode(code);
                                    setMunicipals([]);
                                    setBarangays([]);
                                    setFormData((prev) => ({
                                        ...prev,
                                        province: province?.name || '',
                                        municipal: '',
                                        barangay: '',
                                    }));
                                }}
                                disabled={!provinces.length}
                            >
                                <option value="">Select Province</option>
                                {provinces.map((p) => (
                                    <option key={p.code} value={p.code}>
                                        {p.name}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={municipalCode}
                                required
                                onChange={(e) => {
                                    const code = e.target.value;
                                    const municipal = municipals.find((m) => m.code === code);
                                    setMunicipalCode(code);
                                    setBarangays([]);
                                    setFormData((prev) => ({
                                        ...prev,
                                        municipal: municipal?.name || '',
                                        barangay: '',
                                    }));
                                }}
                                disabled={!municipals.length}
                            >
                                <option value="">Select Municipality</option>
                                {municipals.map((m) => (
                                    <option key={m.code} value={m.code}>
                                        {m.name}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={formData.barangay}
                                required
                                onChange={(e) => {
                                    const name = e.target.value;
                                    setFormData((prev) => ({
                                        ...prev,
                                        barangay: name,
                                    }));
                                }}
                                disabled={!barangays.length}
                            >
                                <option value="">Select Barangay</option>
                                {barangays.map((b) => (
                                    <option key={b.code} value={b.name}>
                                        {b.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Address Line & Postal Code */}
                        <input
                            type="text"
                            name="addressLine"
                            value={formData.addressLine}
                            onChange={handleChange}
                            className="w-full p-2 border rounded text-sm"
                            placeholder="Building, House No, Street"
                            required
                        />
                        <input
                            type="number"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleChange}
                            className="w-full p-2 border rounded text-sm"
                            placeholder="Postal Code"
                            required
                        />

                        <button
                            type="submit"
                            className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-500"
                        >
                            Save Shipping Address Details
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SetUpShippingAddress;
